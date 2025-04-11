/**
 *       Company  NetValue Technology - https://www.netvaluetech.com/
 *   Description  Selects the applicable 3PL Order Fulfillment Configuration Rule records for an order and updates the
 *                order with the parameters defined in those rules.
 *
 *                NOTE: Javascript transpiled from TypeScript file NV.OFC.WA_configureOrder.ts
 *
 *      ScriptId  customscript_ofc_configure_order
 *  DeploymentId  customdeploy_ofc_configure_order
 *
 *
 * @NApiVersion 2.1
 * @NScriptType workflowactionscript
 **/

import {EntryPoints} from 'N/types'
import * as record from 'N/record'
import * as search from 'N/search'
import * as LogManager from '../NFT-SS2-7.3.1/EC_Logger'
import * as geo from '../NFT-SS2-7.3.1/geography'

namespace NV {
  const log = LogManager.DefaultLogger

  /**
   * You can't return a JavaScript boolean from a custom Workflow Action and I can't stand seeing silly T and F return
   * values. This enum makes me feel better and improves the code quality. :)
   */
  export enum WF_ACTION_BOOLEAN {
    TRUE = 'T',
    FALSE = 'F'
  }

  /**
   * Values from the order that are utilized as criterion to select applicable configuration rules.
   */
  type OrderConfigurationRuleCriterion = {
    customerIID: number,
    customerTypeIID: number,
    destinationCountryIID: number,
    destinationStateOrProvinceIID: number|null,
    orderIID: number,    //  Primarily for logging and debugging purposes
    productCatalogIIDs: number[]
  }

  type OrderFulfillmentConfiguration = {
    appliesToLines: boolean,
    customerIID: number,
    customerTypeIID: number,
    destinationCountryIID: number,
    destinationStateOrProvinceIID: number,
    dominant: boolean,
    fulfillmentLocationIID: number,
    iid: number,
    productCatalogIIDs: number[],
    shippingMethodIID: number
  }

  /**
   * "3PL Order Fulfillment Configuration Rule" record (customrecord_3pl_fulfill_config_rule) constants
   * @private
   */
const CONFIG_RULE = {
  ID: 'customrecord_3pl_fulfill_config_rule',
  FIELD: {
    APPLIES_TO_LINES: 'custrecord_3plfcr_apply_to_lines',
    CUSTOMER: 'custrecord_3plfcr_customer',
    CUSTOMER_TYPE: 'custrecord_3plfcr_customer_type',
    DEST_COUNTRY: 'custrecord_3plfcr_dest_country',
    DEST_STATE: 'custrecord_3plfcr_dest_state',
    DOMINANT: 'custrecord_3plfcr_dominant',
    FULFILL_LOCATION: 'custrecord_3plfcr_fulfillment_location',
    INACTIVE: 'isinactive',
    PRODUCT_CATALOG: 'custrecord_3plfcr_product_catalog',
    SHIP_SERVICE: 'custrecord_3plfcr_shipping_svc'
  }
}

  /**
   *
   * @private
   */
  const SALES_ORDER = {
  FIELD: {
    APPLIED_CONF: 'custbody_applied_fulfillment_conf',
    LOCATION: 'location',
    SHIPPING_METHOD: 'shipmethod'
  },
  LINE_FIELD: {
    APPLIED_CONF: 'custcol_applied_fulfillment_conf',
    SHIPPING_METHOD: 'custcol_shipping_method'
  }
}

  /**
   * Script entrypoint
   * @param context
   */
  export function onAction(context: EntryPoints.WorkflowAction.onActionContext): WF_ACTION_BOOLEAN {

    try {

      //  There isn't a current need to support per-line configuration, but we might as well craft it that way from
      //  the start so when it inevitably comes, we're ready. This essentially means grouping lines by Product Class
      //  and searching for applicable rules per-catalog. We can hopefully do this in one combined search and separate
      //  out in the mapping stage.
      //
      //  Basic overview:
      //  1) Collect the order criterion details
      //  2) Search for the matching configurations
      //  3) Iterate over the configurations and apply to the order
      //
      //  The return value from this function indicates success or fail of the operation, not that an update was
      //  actually performed. Basically, a FALSE response is treated as an error condition.
      const criterion = NV._getOrderCriterion(context.newRecord)
      const configurations = NV._getApplicableFulfillmentConfigurations(criterion)
      if (configurations.length === 0) {
        //  This can happen... it shouldn't, but nothing guarantees all the rules will be there to satisfy all orders.
        //  So, what do we do? Requirements are specific in this regard and I think this will evolve, for now we'll log
        //  an audit and quietly exit...
        log.info('No Applicable Configurations - Exiting', `Could not find any applicable configurations for ` +
          `order criterion: (${JSON.stringify(criterion)})`)
        return WF_ACTION_BOOLEAN.FALSE
      }

      //  Update the order
      NV._applyOrderFulfillmentConfiguration(context.newRecord, configurations)
      return WF_ACTION_BOOLEAN.TRUE

    } catch(saveEx) {
      log.error('save exception', saveEx)
      return WF_ACTION_BOOLEAN.FALSE
    }
  }

  /**
   * Main function responsible for actually updating the order with the details of the applicable configuration records.
   * @param order
   * @param configurations
   */
  export function _applyOrderFulfillmentConfiguration(order: record.Record, configurations: OrderFulfillmentConfiguration[]): void {
    const mainlineConfiguration = configurations[0]

    const ITEM_LIST_ID = 'item'

    order.setValue({ fieldId: SALES_ORDER.FIELD.APPLIED_CONF, value: mainlineConfiguration.iid })
    order.setValue({ fieldId: SALES_ORDER.FIELD.LOCATION, value: mainlineConfiguration.fulfillmentLocationIID })
    log.debug(`Set mainline location to ${mainlineConfiguration.fulfillmentLocationIID}`)

    if (mainlineConfiguration.shippingMethodIID) {
      order.setValue({fieldId: SALES_ORDER.FIELD.SHIPPING_METHOD, value: mainlineConfiguration.shippingMethodIID})
      log.debug(`Set mainline shipping method to ${mainlineConfiguration.shippingMethodIID}`)
    }

    //  Iterate over the lines and for each fulfillable line (i.e., qty not null, in this case) look for a matching
    //  configuration record and apply its settings to the line fields.
    for (let i = 0; i < order.getLineCount({ sublistId: ITEM_LIST_ID }); i++) {
      if (NV._isFulfillableLine(order, i) === false) {
        continue
      }

      //  Get the line configuration. We aren't going to be surgical about the application of the configuration. We've
      //  already determined the order needs to be updated so we'll just apply to all lines.
      const lineConfiguration = NV._findLineConfigurationThrowIfMissing(configurations, order, i)

      //  Not all configurations apply to lines
      if (lineConfiguration.appliesToLines === false) {
        log.info(`Line ${i} Not Configured`, `Line ${i} applicable Configuration ${lineConfiguration.iid} is not ` +
            `configured to 'Apply to Lines'. No update has been performed on line ${i}`)
        continue
      }

      //  A shipping method isn't required, a rule could just be used to assign locations to an order so we need to
      //  conditionally set the Shipping Method on the lines.
      if (lineConfiguration.shippingMethodIID) {
        order.selectLine({ sublistId: ITEM_LIST_ID, line: i })
        order.setCurrentSublistValue({
          sublistId: ITEM_LIST_ID,
          fieldId: SALES_ORDER.LINE_FIELD.SHIPPING_METHOD,
          value: lineConfiguration.shippingMethodIID
        })
        order.setCurrentSublistValue({
          sublistId: ITEM_LIST_ID,
          fieldId: SALES_ORDER.LINE_FIELD.APPLIED_CONF,
          value: lineConfiguration.iid
        })
        order.commitLine({ sublistId: ITEM_LIST_ID })
        log.debug(`Configured line ${i}`, `Set line ${i} to shipping method ${lineConfiguration.shippingMethodIID}`)
      }
    }
  }

  /**
   * Helper to determine if the line at the supplied index is a fulfillable line, ar that it would need to have a
   * Fulfillment Configuration treatment.
   * @param order
   * @param lineIndex
   * @private
   */
  export function _isFulfillableLine(order: record.Record, lineIndex: number): boolean {
    const qty = order.getSublistValue({ sublistId: 'item', fieldId: 'quantity', line: lineIndex })
    log.debug(`Line ${lineIndex} qty ${qty}`)
    return !!qty
  }

  /**
   * Helper to find the appropriate configuration for a line. Currently only cares about Product Catalog, but can
   * easily be extended in the future.
   *
   * @param configurations
   * @param order
   * @param lineIndex
   * @private
   */
  export function _findLineConfigurationThrowIfMissing(configurations: OrderFulfillmentConfiguration[], order: record.Record, lineIndex: number ): OrderFulfillmentConfiguration {
    const productCatalogIID = Number(order.getSublistValue({ sublistId: 'item', fieldId: 'class', line: lineIndex }))
    //  If there is only a single configuration we'll return that
    if (configurations.length === 1) {
      return configurations[0]
    }

    //  It's possible we have two configurations, each with a different catalog, and we have an order with two lines,
    //  each with a different catalog. I think in this case we want to match the line with whatever config supports its
    //  catalog.
    //
    //  If we search and there are no configurations that explicitly support the line catalog we can just return the
    //  first configuration.
    //
    //  There is more than 1, attempt to filter by product ID
    const ret = configurations.find(conf => conf.productCatalogIIDs && conf.productCatalogIIDs.includes(productCatalogIID))
    if (!ret) {
      return configurations[0]
    }
    return ret
  }

  /**
   * Simple mapper to take a search result and return a {OrderFulfillmentConfiguration}
   * @param result
   * @private
   */
  export function _mapConfigurationResult(result: search.Result): OrderFulfillmentConfiguration {
    const productCatalogs = result.getValue(CONFIG_RULE.FIELD.PRODUCT_CATALOG) as string
    //  If there is not shipping method defined this will be an empty array which Number() will parse as 0 (<- not good)
    const shippingMethod = result.getValue(CONFIG_RULE.FIELD.SHIP_SERVICE)
    const customer = result.getValue(CONFIG_RULE.FIELD.CUSTOMER)
    const customerType = result.getValue(CONFIG_RULE.FIELD.CUSTOMER_TYPE)
    const destinationCountry = result.getValue(CONFIG_RULE.FIELD.DEST_COUNTRY)
    const destinationState = result.getValue(CONFIG_RULE.FIELD.DEST_STATE)

    return {
      appliesToLines: !!result.getValue(CONFIG_RULE.FIELD.APPLIES_TO_LINES),
      customerIID: (customer) ? Number(customer) : null,
      customerTypeIID: (customerType) ? Number(customerType) : null,
      destinationCountryIID: (destinationCountry) ? Number(destinationCountry) : null,
      destinationStateOrProvinceIID: (destinationState) ? Number(destinationState) : null,
      dominant: !!result.getValue(CONFIG_RULE.FIELD.DOMINANT),
      fulfillmentLocationIID: Number(result.getValue(CONFIG_RULE.FIELD.FULFILL_LOCATION)),
      iid: Number(result.id),

      //  No guarantee there will be Product Configurations, and I'm not sure if that will result in null or empty array
      productCatalogIIDs: (productCatalogs) ? productCatalogs.split(',').map(x => Number(x.trim())) : null,
      shippingMethodIID: (shippingMethod) ? Number(shippingMethod) : null
    }
  }

  /**
   * Searches for any Order Fulfillment Configurations that are applicable for this order.
   * @param criterion
   */
  export function _getApplicableFulfillmentConfigurations(criterion: OrderConfigurationRuleCriterion): OrderFulfillmentConfiguration[] {

    //  We want to search for applicable rules based on the supplied criterion
    //  The goal is to have relaxed criteria, if a rule doesn't define a criteria it should default to applicable. For
    //  example, if a rule has no customer type specified that should be the same as "any customer type", this is
    //  basically accomplished with sets of -OR- expressions: "is criterion OR is empty"
    //
    //  ## Criterion
    //  ----------------------------------------------------------------------------------------------------------
    //  Customer                    - not required (e.g., EU orders will make use of this feature)
    //  Customer Type               - not required (e.g., US orders don't care)
    //  Destination Country         - required
    //  Destination State/Province  - not required (e.g., European orders)
    //  Product Catalog             - not required (US orders don't care)
    //  ----------------------------------------------------------------------------------------------------------
    //
    //  For a rule that will only allow a single product catalog we want to search for rules that contain ALL the
    //  catalogs on the order, rather than any. So restricting Mira Loma to toxin at launch is a good example, if an
    //  order has filler it should NOT route to ML.
    //
    //
    //  The search can yield multiple results due to the design of filters with a none option, however these are lower
    //  grade results, and we want to sort them out or down and select only the single match off the top.
    const SELECT_NONE = '@NONE@'
    const SEARCH_EXP_OP = { AND: 'AND', OR: 'OR' }

    const configResults = search.create({
      type: CONFIG_RULE.ID,
      filters: [
        [ CONFIG_RULE.FIELD.INACTIVE, search.Operator.IS, false ], SEARCH_EXP_OP.AND,
        [ CONFIG_RULE.FIELD.CUSTOMER, search.Operator.ANYOF, [criterion.customerIID, SELECT_NONE] ], SEARCH_EXP_OP.AND,
        [ CONFIG_RULE.FIELD.CUSTOMER_TYPE, search.Operator.ANYOF, [criterion.customerTypeIID, SELECT_NONE] ], SEARCH_EXP_OP.AND,
        [ CONFIG_RULE.FIELD.DEST_COUNTRY, search.Operator.IS, criterion.destinationCountryIID ], SEARCH_EXP_OP.AND,
        [ CONFIG_RULE.FIELD.DEST_STATE, search.Operator.ANYOF, [criterion.destinationStateOrProvinceIID, SELECT_NONE] ], SEARCH_EXP_OP.AND,
        [ CONFIG_RULE.FIELD.PRODUCT_CATALOG, search.Operator.ANYOF, [...criterion.productCatalogIIDs, SELECT_NONE] ]
      ],
      columns: [
        { name: 'internalid', sort: search.Sort.DESC },
        CONFIG_RULE.FIELD.APPLIES_TO_LINES,
        CONFIG_RULE.FIELD.CUSTOMER,
        CONFIG_RULE.FIELD.CUSTOMER_TYPE,
        CONFIG_RULE.FIELD.DEST_COUNTRY,
        CONFIG_RULE.FIELD.DEST_STATE,
        CONFIG_RULE.FIELD.DOMINANT,
        CONFIG_RULE.FIELD.FULFILL_LOCATION,
        CONFIG_RULE.FIELD.SHIP_SERVICE,
        CONFIG_RULE.FIELD.PRODUCT_CATALOG
      ]
    }).run().getRange({ start: 0, end: 1000 })
    log.debug('rule results', configResults)
    if (configResults.length > 1) {
      log.warn(`${configResults.length} 3PL Config Results Found`)
    }

    const mapped = configResults.map(NV._mapConfigurationResult)
    log.debug('unsorted configurations (default sort by IID)', mapped)
    mapped.sort(NV._qualitySortConfigRules)

    //  Log a warning if there are more than 1 dominate rules
    NV._logWarningIfMultipleDominantRulesExist(mapped)

    return mapped
  }

  /**
   * This sort algorithm is basically preferring rules that are more specific over less defined rules.
   * @param a
   * @param b
   */
  export function _qualitySortConfigRules(a: OrderFulfillmentConfiguration, b: OrderFulfillmentConfiguration): number {
    if (a.customerIID !== null && b.customerIID === null) return -1
    if (a.customerIID === null && b.customerIID !== null) return 1
    if (a.shippingMethodIID !== null && b.shippingMethodIID === null) return -1
    if (a.shippingMethodIID === null && b.shippingMethodIID !== null) return 1
    //  Sorting array properties needs special consideration. We don't want to sort based on the CONTENTS of the arrays,
    //  rather we want to sort based on if the array is empty or not.
    //
    if (a.productCatalogIIDs !== null && b.productCatalogIIDs === null) return -1
    if (a.productCatalogIIDs === null && b.productCatalogIIDs !== null) return 1
    if (a.destinationCountryIID !== null && b.destinationCountryIID === null) return -1
    if (a.destinationCountryIID === null && b.destinationCountryIID !== null) return 1
    if (a.destinationStateOrProvinceIID !== null && b.destinationStateOrProvinceIID === null) return -1
    if (a.destinationStateOrProvinceIID === null && b.destinationStateOrProvinceIID !== null) return 1
    if (a.dominant > b.dominant) return -1
    if (a.dominant < b.dominant) return 1
    return 0
  }

  /**
   * Helper to grab just the order details we need to search for config rules.
   * @param order
   */
  export function _getOrderCriterion(order: record.Record): OrderConfigurationRuleCriterion {

    //  Customer Type isn't available on the order, we'll need to lookup from the Customer. Since we're already running
    //  a search we might as well do a transaction search and get the order data we need in a nice little search result
    //  array.
    const res = search.create({
      type: search.Type.SALES_ORDER,
      filters: [
        [ 'internalid', search.Operator.IS, order.id ], 'AND',
        [ 'mainline', search.Operator.IS, false ], 'AND',
        [ 'shipping', search.Operator.IS, false ], 'AND',
        [ 'taxline', search.Operator.IS, false ]
      ],
      columns: [
        { name: 'class', summary: search.Summary.GROUP },
        { name: 'custentity_customer_type', join: 'customer', summary: search.Summary.GROUP },
        { name: 'entity', summary: search.Summary.GROUP },
        { name: 'internalid', summary: search.Summary.GROUP },
        { name: 'shipcountry', summary: search.Summary.GROUP },
        { name: 'shipstate', summary: search.Summary.GROUP }
      ]
    }).run().getRange({ start: 0, end: 1000 })
    log.debug('order search results', (res.length > 0) ? res[0] : null)

    //  We can have multiple product catalogs so we'll reduce the results down to a single object with an array of
    //  catalogs
    return res.reduce<OrderConfigurationRuleCriterion>((acc, cur) => {
      const customerTypeIID = cur.getValue({ name: 'custentity_customer_type', join: 'customer', summary: search.Summary.GROUP })

      //  Each iteration of reduce will be a new catalog (or should be). We basically just need to know if this is the
      //  first run
      if (!acc) {
        //  first run, create the record
        const countryCode = cur.getValue({ name: 'shipcountry', summary: search.Summary.GROUP }) as string
        log.debug('countryCode', countryCode)
        const stateCode = cur.getValue({ name: 'shipstate', summary: search.Summary.GROUP }) as string
        log.debug('stateCode', stateCode)

        //  Handling of states is complicated because NetSuite will sometimes have an IID of a State record as the
        //  value, and sometimes it will be a free-form text value of the name. This depends on whether the country and
        //  state data is loaded in the account, which itself is an odd situation as you can't import it.
        //
        //  For now, we only need state support for the US, if we need international state support this will need to be
        //  addressed.
        const USA_COUNTRY_CODE = 'US'
        const stateIID = (countryCode === USA_COUNTRY_CODE) ? geo.getStateByShortName(stateCode).id : null

        acc = {
          customerIID: Number(cur.getValue({ name: 'entity', summary: search.Summary.GROUP })),
          customerTypeIID: (customerTypeIID) ? Number(customerTypeIID) : null,
          destinationCountryIID: geo.countryMapping.find(x => x.id === countryCode).uniquekey,
          destinationStateOrProvinceIID: stateIID,
          orderIID: Number(cur.getValue({ name: 'internalid', summary: search.Summary.GROUP })),
          productCatalogIIDs: []
        }
      }

      acc.productCatalogIIDs.push(Number(cur.getValue({ name: 'class', summary: search.Summary.GROUP })))
      return acc

    }, null)
  }

  export function _logWarningIfMultipleDominantRulesExist(configs: OrderFulfillmentConfiguration[]): void {
    const dominantRuleCount= configs.filter(x => x.dominant).length
    if (dominantRuleCount > 1) {
      log.warn('Ambiguous Dominant Rules Detected', `${dominantRuleCount} dominant configuration rules found, this ` +
          `creates an ambiguous situation. The first configuration will be used.`)
    }
  }
}


LogManager.setIncludeCorrelationId(true)
LogManager.autoLogMethodEntryExit({target: NV, method: /\w+/}, {
  withArgs: true,
  withReturnValue: true,
  withProfiling: true
})

export = {
  onAction: NV.onAction
}
