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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "N/search", "N/search", "../NFT-SS2-7.3.1/EC_Logger", "../NFT-SS2-7.3.1/geography"], factory);
    }
})(function (require, exports) {
    "use strict";
    const search = require("N/search");
    const search_1 = require("N/search");
    const LogManager = require("../NFT-SS2-7.3.1/EC_Logger");
    const geo = require("../NFT-SS2-7.3.1/geography");
    var NV;
    (function (NV) {
        const log = LogManager.DefaultLogger;
        /**
         * You can't return a JavaScript boolean from a custom Workflow Action and I can't stand seeing silly T and F return
         * values. This enum makes me feel better and improves the code quality. :)
         */
        let WF_ACTION_BOOLEAN;
        (function (WF_ACTION_BOOLEAN) {
            WF_ACTION_BOOLEAN["TRUE"] = "T";
            WF_ACTION_BOOLEAN["FALSE"] = "F";
        })(WF_ACTION_BOOLEAN = NV.WF_ACTION_BOOLEAN || (NV.WF_ACTION_BOOLEAN = {}));
        /**
         * "3PL Order Fulfillment Configuration Rule" record (customrecord_3pl_fulfill_config_rule) constants
         * @private
         */
        const CONFIG_RULE = {
            ID: 'customrecord_3pl_fulfill_config_rule',
            FIELD: {
                CUSTOMER: 'custrecord_3plfcr_customer',
                CUSTOMER_TYPE: 'custrecord_3plfcr_customer_type',
                DEST_COUNTRY: 'custrecord_3plfcr_dest_country',
                DEST_STATE: 'custrecord_3plfcr_dest_state',
                FULFILL_LOCATION: 'custrecord_3plfcr_fulfillment_location',
                INACTIVE: 'isinactive',
                PRODUCT_CATALOG: 'custrecord_3plfcr_product_catalog',
                SHIP_SERVICE: 'custrecord_3plfcr_shipping_svc'
            }
        };
        /**
         *
         * @private
         */
        const SALES_ORDER = {
            FIELD: {
                APPLIED_CONF: 'custbody_applied_fulfillment_conf',
                LOCATION: 'location'
            },
            LINE_FIELD: {
                APPLIED_CONF: 'custcol_applied_fulfillment_conf',
                SHIPPING_METHOD: 'custcol_shipping_method'
            }
        };
        /**
         * Script entrypoint
         * @param context
         */
        function onAction(context) {
            try {
                //  We won't load the record to make an update unless there are actually new values to set.
                //  In the context we have a readonly copy of the current record.
                //
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
                const criterion = NV._getOrderCriterion(context.newRecord);
                const configurations = NV._getApplicableFulfillmentConfigurations(criterion);
                if (configurations.length === 0) {
                    //  This can happen... it shouldn't, but nothing guarantees all the rules will be there to satisfy all orders.
                    //  So, what do we do? Requirements are specific in this regard and I think this will evolve, for now we'll log
                    //  an audit and quietly exit...
                    log.info('No Applicable Configurations - Exiting', `Could not find any applicable configurations for ` +
                        `order criterion: (${JSON.stringify(criterion)})`);
                    return WF_ACTION_BOOLEAN.FALSE;
                }
                if (NV._orderRequiresUpdate(context.newRecord, configurations) === false) {
                    log.info('Order does not need updating, exiting');
                    return WF_ACTION_BOOLEAN.TRUE;
                }
                //  Update the order
                NV._applyOrderFulfillmentConfiguration(context.newRecord, configurations);
                return WF_ACTION_BOOLEAN.TRUE;
            }
            catch (saveEx) {
                log.error('save exception', saveEx);
                return WF_ACTION_BOOLEAN.FALSE;
            }
        }
        NV.onAction = onAction;
        /**
         * Main function responsible for actually updating the order with the details of the applicable configuration records.
         * @param order
         * @param configurations
         */
        function _applyOrderFulfillmentConfiguration(order, configurations) {
            const mainlineConfiguration = configurations[0];
            const ITEM_LIST_ID = 'item';
            order.setValue({ fieldId: SALES_ORDER.FIELD.APPLIED_CONF, value: mainlineConfiguration.iid });
            order.setValue({ fieldId: SALES_ORDER.FIELD.LOCATION, value: mainlineConfiguration.fulfillmentLocationIID });
            log.debug(`Set mainline location to ${mainlineConfiguration.fulfillmentLocationIID}`);
            //  Iterate over the lines and for each fulfillable line (i.e., qty not null, in this case) look for a matching
            //  configuration record and apply its settings to the line fields.
            for (let i = 0; i < order.getLineCount({ sublistId: ITEM_LIST_ID }); i++) {
                if (NV._isFulfillableLine(order, i) === false) {
                    continue;
                }
                //  Get the line configuration. We aren't going to be surgical about the application of the configuration. We've
                //  already determined the order needs to be updated so we'll just apply to all lines.
                const lineConfiguration = NV._findLineConfigurationThrowIfMissing(configurations, order, i);
                //  A shipping method isn't required, a rule could just be used to assign locations to an order so we need to
                //  conditionally set the Shipping Method on the lines.
                if (lineConfiguration.shippingMethodIID) {
                    order.selectLine({ sublistId: ITEM_LIST_ID, line: i });
                    order.setCurrentSublistValue({
                        sublistId: ITEM_LIST_ID,
                        fieldId: SALES_ORDER.LINE_FIELD.SHIPPING_METHOD,
                        value: lineConfiguration.shippingMethodIID
                    });
                    order.setCurrentSublistValue({
                        sublistId: ITEM_LIST_ID,
                        fieldId: SALES_ORDER.LINE_FIELD.APPLIED_CONF,
                        value: lineConfiguration.iid
                    });
                    order.commitLine({ sublistId: ITEM_LIST_ID });
                    log.debug(`Configured line ${i}`, `Set line ${i} to shipping method ${lineConfiguration.shippingMethodIID}`);
                }
            }
        }
        NV._applyOrderFulfillmentConfiguration = _applyOrderFulfillmentConfiguration;
        /**
         * Compares the current order configuration with the applicable configuration rules to determine if there are any
         * variances and an update is necessary. The primary motivation for this method is to avoid loading a writable copy
         * of the order if it isn't strictly needed.
         * @param order
         * @param configurations
         */
        function _orderRequiresUpdate(order, configurations) {
            //  Compare the header values first, then work through the lines
            //  For header stuff we'll just use the first configuration
            const headerConfiguration = configurations[0];
            const curLocation = order.getValue(SALES_ORDER.FIELD.LOCATION);
            if (curLocation != headerConfiguration.fulfillmentLocationIID) {
                log.debug('Order requires update', `Current header location ${curLocation} doesn't match configuration ` +
                    `location ${headerConfiguration.fulfillmentLocationIID}`);
                return true;
            }
            //  Check the lines
            for (let i = 0; i < order.getLineCount({ sublistId: 'item' }); i++) {
                //  Skip lines that aren't fulfillable
                if (_isFulfillableLine(order, i) === false) {
                    log.debug(`Skipping line ${i} as unfulfillable`);
                    continue;
                }
                const config = NV._findLineConfigurationThrowIfMissing(configurations, order, i);
                //  We only need to check this if the configuration actually defines a shipping method, we don't need to support
                //  CLEARING the existing shipping method on the line
                if (config.shippingMethodIID) {
                    //  get the ship service and compare it to the configuration to determine if an update is required
                    const tmp = order.getSublistValue({ sublistId: 'item', fieldId: SALES_ORDER.LINE_FIELD.SHIPPING_METHOD, line: i });
                    const existingLineShippingMethod = (tmp) ? Number(tmp) : null;
                    if (existingLineShippingMethod !== config.shippingMethodIID) {
                        log.debug('Order needs updating', `Order lines ${i} shipping method ${existingLineShippingMethod} doesn't match config`);
                        return true;
                    }
                }
            }
            //  Nothing needs updating
            return false;
        }
        NV._orderRequiresUpdate = _orderRequiresUpdate;
        /**
         * Helper to determine if the line at the supplied index is a fulfillable line, ar that it would need to have a
         * Fulfillment Configuration treatment.
         * @param order
         * @param lineIndex
         * @private
         */
        function _isFulfillableLine(order, lineIndex) {
            const qty = order.getSublistValue({ sublistId: 'item', fieldId: 'quantity', line: lineIndex });
            log.debug(`Line ${lineIndex} qty ${qty}`);
            return !!qty;
        }
        NV._isFulfillableLine = _isFulfillableLine;
        /**
         * Helper to find the appropriate configuration for a line. Currently only cares about Product Catalog, but can
         * easily be extended in the future.
         *
         * @param configurations
         * @param order
         * @param lineIndex
         * @private
         */
        function _findLineConfigurationThrowIfMissing(configurations, order, lineIndex) {
            const productCatalogIID = Number(order.getSublistValue({ sublistId: 'item', fieldId: 'class', line: lineIndex }));
            //  If there is only a single configuration we'll return that
            if (configurations.length === 1) {
                return configurations[0];
            }
            //  It's possible we have two configurations, each with a different catalog, and we have an order with two lines,
            //  each with a different catalog. I think in this case we want to match the line with whatever config supports its
            //  catalog.
            //
            //  If we search and there are no configurations that explicitly support the line catalog we can just return the
            //  first configuration.
            //
            //  There is more than 1, attempt to filter by product ID
            const ret = configurations.find(conf => conf.productCatalogIIDs && conf.productCatalogIIDs.includes(productCatalogIID));
            if (!ret) {
                return configurations[0];
            }
            return ret;
        }
        NV._findLineConfigurationThrowIfMissing = _findLineConfigurationThrowIfMissing;
        /**
         * Simple mapper to take a search result and return a {OrderFulfillmentConfiguration}
         * @param result
         * @private
         */
        function _mapConfigurationResult(result) {
            const productCatalogs = result.getValue(CONFIG_RULE.FIELD.PRODUCT_CATALOG);
            //  If there is not shipping method defined this will be an empty array which Number() will parse as 0 (<- not good)
            const shippingMethod = result.getValue(CONFIG_RULE.FIELD.SHIP_SERVICE);
            const customer = result.getValue(CONFIG_RULE.FIELD.CUSTOMER);
            const customerType = result.getValue(CONFIG_RULE.FIELD.CUSTOMER_TYPE);
            const destinationCountry = result.getValue(CONFIG_RULE.FIELD.DEST_COUNTRY);
            const destinationState = result.getValue(CONFIG_RULE.FIELD.DEST_STATE);
            return {
                customerIID: (customer) ? Number(customer) : null,
                customerTypeIID: (customerType) ? Number(customerType) : null,
                destinationCountryIID: (destinationCountry) ? Number(destinationCountry) : null,
                destinationStateOrProvinceIID: (destinationState) ? Number(destinationState) : null,
                fulfillmentLocationIID: Number(result.getValue(CONFIG_RULE.FIELD.FULFILL_LOCATION)),
                iid: Number(result.id),
                //  No guarantee there will be Product Configurations, and I'm not sure if that will result in null or empty array
                productCatalogIIDs: (productCatalogs) ? productCatalogs.split(',').map(x => Number(x.trim())) : null,
                shippingMethodIID: (shippingMethod) ? Number(shippingMethod) : null
            };
        }
        NV._mapConfigurationResult = _mapConfigurationResult;
        /**
         * Searches for any Order Fulfillment Configurations that are applicable for this order.
         * @param criterion
         */
        function _getApplicableFulfillmentConfigurations(criterion) {
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
            const SELECT_NONE = '@NONE@';
            const SEARCH_EXP_OP = { AND: 'AND', OR: 'OR' };
            const configResults = search.create({
                type: CONFIG_RULE.ID,
                filters: [
                    [CONFIG_RULE.FIELD.INACTIVE, search.Operator.IS, false], SEARCH_EXP_OP.AND,
                    [CONFIG_RULE.FIELD.CUSTOMER, search.Operator.ANYOF, [criterion.customerIID, SELECT_NONE]], SEARCH_EXP_OP.AND,
                    [CONFIG_RULE.FIELD.CUSTOMER_TYPE, search.Operator.ANYOF, [criterion.customerTypeIID, SELECT_NONE]], SEARCH_EXP_OP.AND,
                    [CONFIG_RULE.FIELD.DEST_COUNTRY, search.Operator.IS, criterion.destinationCountryIID], SEARCH_EXP_OP.AND,
                    [CONFIG_RULE.FIELD.DEST_STATE, search.Operator.ANYOF, [criterion.destinationStateOrProvinceIID, SELECT_NONE]], SEARCH_EXP_OP.AND,
                    //  Rules must support ALL the catalogs on the  - wait... this might not work. This will break for per-line rules
                    //  We want to match rules that define all the catalogs AND some of the catalogs; a quandary. This feature isn't
                    //  needed for now so I'll leave it as-is (strong support for all catalogs or no catalogs matching) and adjust
                    //  if the feature is needed in the future.
                    [
                        [CONFIG_RULE.FIELD.PRODUCT_CATALOG, search.Operator.ALLOF, [...criterion.productCatalogIIDs]], SEARCH_EXP_OP.OR,
                        [CONFIG_RULE.FIELD.PRODUCT_CATALOG, search.Operator.ANYOF, [SELECT_NONE]]
                    ]
                ],
                columns: [
                    { name: 'internalid', sort: search_1.Sort.DESC },
                    CONFIG_RULE.FIELD.DEST_COUNTRY,
                    CONFIG_RULE.FIELD.DEST_STATE,
                    CONFIG_RULE.FIELD.CUSTOMER,
                    CONFIG_RULE.FIELD.CUSTOMER_TYPE,
                    CONFIG_RULE.FIELD.FULFILL_LOCATION,
                    CONFIG_RULE.FIELD.SHIP_SERVICE,
                    CONFIG_RULE.FIELD.PRODUCT_CATALOG
                ]
            }).run().getRange({ start: 0, end: 1000 });
            log.debug('rule results', configResults);
            if (configResults.length > 1) {
                log.warn(`${configResults.length} 3PL Config Results Found`);
            }
            const mapped = configResults.map(NV._mapConfigurationResult);
            log.debug('unsorted configurations', mapped);
            //  Note: Sorting with: (b-a) to get records with customer IIDs first, then nulls at the end
            //  reverse() call is needed to get the most specific results first, which is what we want
            mapped.sort(NV._qualitySortConfigRules).reverse();
            return mapped;
        }
        NV._getApplicableFulfillmentConfigurations = _getApplicableFulfillmentConfigurations;
        /**
         *
         * @param a
         * @param b
         */
        function _qualitySortConfigRules(a, b) {
            if (a.customerIID > b.customerIID)
                return 1;
            if (a.customerIID < b.customerIID)
                return -1;
            if (a.shippingMethodIID > b.customerIID)
                return 1;
            if (a.shippingMethodIID < b.shippingMethodIID)
                return -1;
            if (a.productCatalogIIDs > b.productCatalogIIDs)
                return 1;
            if (a.productCatalogIIDs < b.productCatalogIIDs)
                return -1;
            if (a.destinationCountryIID > b.destinationCountryIID)
                return 1;
            if (a.destinationCountryIID < b.destinationCountryIID)
                return -1;
            if (a.destinationStateOrProvinceIID > b.destinationStateOrProvinceIID)
                return 1;
            if (a.destinationStateOrProvinceIID > b.destinationStateOrProvinceIID)
                return -1;
            return 0;
        }
        NV._qualitySortConfigRules = _qualitySortConfigRules;
        /**
         * Helper to grab just the order details we need to search for config rules.
         * @param order
         */
        function _getOrderCriterion(order) {
            //  Customer Type isn't available on the order, we'll need to lookup from the Customer. Since we're already running
            //  a search we might as well do a transaction search and get the order data we need in a nice little search result
            //  array.
            const res = search.create({
                type: search.Type.SALES_ORDER,
                filters: [
                    ['internalid', search.Operator.IS, order.id], 'AND',
                    ['mainline', search.Operator.IS, false], 'AND',
                    ['shipping', search.Operator.IS, false], 'AND',
                    ['taxline', search.Operator.IS, false]
                ],
                columns: [
                    { name: 'class', summary: search.Summary.GROUP },
                    { name: 'custentity_customer_type', join: 'customer', summary: search.Summary.GROUP },
                    { name: 'entity', summary: search.Summary.GROUP },
                    { name: 'internalid', summary: search.Summary.GROUP },
                    { name: 'shipcountry', summary: search.Summary.GROUP },
                    { name: 'shipstate', summary: search.Summary.GROUP }
                ]
            }).run().getRange({ start: 0, end: 1000 });
            log.debug('order search results', (res.length > 0) ? res[0] : null);
            //  We can have multiple product catalogs so we'll reduce the results down to a single object with an array of
            //  catalogs
            return res.reduce((acc, cur) => {
                const customerTypeIID = cur.getValue({ name: 'custentity_customer_type', join: 'customer', summary: search.Summary.GROUP });
                //  Each iteration of reduce will be a new catalog (or should be). We basically just need to know if this is the
                //  first run
                if (!acc) {
                    //  first run, create the record
                    const countryCode = cur.getValue({ name: 'shipcountry', summary: search.Summary.GROUP });
                    log.debug('countryCode', countryCode);
                    const stateCode = cur.getValue({ name: 'shipstate', summary: search.Summary.GROUP });
                    log.debug('stateCode', stateCode);
                    //  Handling of states is complicated because NetSuite will sometimes have an IID of a State record as the
                    //  value and sometimes it will be a free-form text value of the name. This depends on whether the country and
                    //  state data is loaded in the account, which itself is an odd situation as you can't import it.
                    //
                    //  For now we only need state support for the US, if we need international state support this will need to be
                    //  addressed.
                    const USA_COUNTRY_CODE = 'US';
                    const stateIID = (countryCode === USA_COUNTRY_CODE) ? geo.getStateByShortName(stateCode).id : null;
                    acc = {
                        customerIID: Number(cur.getValue({ name: 'entity', summary: search.Summary.GROUP })),
                        customerTypeIID: (customerTypeIID) ? Number(customerTypeIID) : null,
                        destinationCountryIID: geo.countryMapping.find(x => x.id === countryCode).uniquekey,
                        destinationStateOrProvinceIID: stateIID,
                        orderIID: Number(cur.getValue({ name: 'internalid', summary: search.Summary.GROUP })),
                        productCatalogIIDs: []
                    };
                }
                acc.productCatalogIIDs.push(Number(cur.getValue({ name: 'class', summary: search.Summary.GROUP })));
                return acc;
            }, null);
        }
        NV._getOrderCriterion = _getOrderCriterion;
    })(NV || (NV = {}));
    LogManager.setIncludeCorrelationId(true);
    LogManager.autoLogMethodEntryExit({ target: NV, method: /\w+/ }, {
        withArgs: true,
        withReturnValue: true,
        withProfiling: true
    });
    return {
        onAction: NV.onAction
    };
});
