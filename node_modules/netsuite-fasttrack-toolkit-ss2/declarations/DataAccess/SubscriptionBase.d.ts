import { NetsuiteRecord } from './Record';
import { Sublist, SublistLine } from "./Sublist";
import * as record from 'N/record';
/**
 * priceinterval - Price Book Lines
 * NOTE: This sublist cannot have lines added/removed, so addLine(), removeLine() and removeAllLines() will not work.
 *      Only a small number of fields are able to be edited on this sublist.
 */
export declare class PriceBookLinesSublist extends SublistLine {
    /**
     * Catalog Type |
     * NetSuite lists this as a select field, but often the value is a string (e.g. ADD_ON).
     */
    catalogtype: number | string;
    /**
     * Subscription Line Type
     */
    chargetype: number;
    /**
     * Discount
     */
    discount: number | string;
    /**
     * Charge Frequency |
     * NetSuite lists this as a select field, but often the value is a string (e.g. MONTHLY).
     */
    frequency: number | string;
    /**
     * Included Quantity
     */
    includedquantity: number;
    /**
     * Item
     */
    item: number;
    /**
     * Line Number
     */
    linenumber: number;
    /**
     * Included Quantity Multiplier
     */
    multiplierline: number;
    /**
     * Price Plan
     */
    priceplan: string;
    /**
     * Prorate By |
     * NetSuite lists this as a select field, but often the value is a string (e.g. MONTH).
     */
    prorateby: number | string;
    /**
     * Quantity
     */
    quantity: number;
    /**
     * Recurring Amount
     */
    recurringamount: number;
    /**
     * Repeat Every
     */
    repeatevery: number;
    /**
     * Start Date
     */
    startdate: Date;
    /**
     * Interval |
     * NetSuite lists this as a select field, but often the value is a string (e.g. MONTH).
     */
    startoffsetunit: number;
    /**
     * Start On
     */
    startoffsetvalue: number;
    /**
     * Status
     */
    status: string;
    /**
     * Subscription Plan Line
     */
    subscriptionplanline: number;
}
/**
 * sublinefromplan - Lines
 */
export declare class SublineFromPlanSublist extends SublistLine {
    /**
     * Item
     */
    item: string;
    /**
     * revrecoption
     */
    revrecoption: string;
}
/**
 * subscriptionline - Lines (Sublist)
 * NOTE: The following fields can't be updated due to NetSuite throwing errors even if the same value is set:
 *      catalogtype, discount, enddate, quantity, recurrencestartdate, startdate, subscription, subscriptionline,
 *      terminationdate.
 *      removeAllLines() will not work on update.
 */
export declare class SubscriptionLineSublist extends SublistLine {
    /**
     * Billing Mode |
     * NetSuite lists this as a select field, but often the value is a string (e.g. IN_ADVANCE).
     */
    billingmode: number | string;
    /**
     * Catalog Type |
     * NetSuite lists this as a select field, but often the value is a string (e.g. OPTIONAL).
     */
    catalogtype: number | string;
    /**
     * Discount
     */
    discount: number | string;
    /**
     * End Date
     */
    enddate: Date;
    /**
     * Include In Renewal Subscription
     */
    includeinrenewal: boolean;
    /**
     * Include
     */
    isincluded: boolean;
    /**
     * Item
     */
    item: number;
    /**
     * Line Number
     */
    linenumber: string;
    /**
     * Prorate End Date
     */
    prorateenddate: boolean;
    /**
     * Prorate Start Date
     */
    proratestartdate: boolean;
    /**
     * Quantity
     */
    quantity: number;
    /**
     * Recurrence Start Date
     */
    recurrencestartdate: Date;
    /**
     * Revenue Recognition Option
     */
    revrecoption: string;
    /**
     * Start Date
     */
    startdate: Date;
    /**
     * Status |
     * NetSuite lists this as a select field, but often the value is a string (e.g. ACTIVE).
     */
    status: number | string;
    /**
     * Subscription
     */
    subscription: number;
    /**
     * Subscription Line
     */
    subscriptionline: number;
    /**
     * Subscription Line Type
     */
    subscriptionlinetype: number;
    /**
     * Termination Date
     */
    terminationdate: Date;
}
/**
 * NetSuite Subscription record type
 */
export declare class SubscriptionBase extends NetsuiteRecord {
    advancerenewalperiodnumber: number;
    /**
     * NetSuite lists this as a select field, but often the value is a string (e.g. DAYS).
     */
    advancerenewalperiodunit: number | string;
    /**
     * Auto
     */
    autoname: boolean;
    /**
     * Automatically Initiate Renewal Process
     */
    autorenewal: boolean;
    /**
     * Billing Account
     */
    billingaccount: number;
    /**
     * Billing Account Start Date |
     * As of 1/20/22, NetSuite says this is a required field, which is incorrect. It is most likely being confused with startdate.
     */
    billingaccountstartdate: Date;
    /**
     * Billing Schedule
     */
    billingschedule: number;
    /**
     * Status |
     * NetSuite lists this as a select field, but it is a string value (e.g. ACTIVE).
     */
    billingsubscriptionstatus: number | string;
    /**
     * Currency
     */
    currency: number;
    /**
     * Customer
     */
    customer: number;
    /**
     * Custom Form
     */
    customform: number;
    /**
     * Default Renewal Method |
     * NetSuite lists this as a select field, but it is a string value (e.g. CREATE_NEW_SUBSCRIPTION).
     * This is optional when Initial Term is Evergreen.
     */
    defaultrenewalmethod: number | string;
    /**
     * Default Renewal Plan |
     * This is optional when Initial Term is Evergreen.
     */
    defaultrenewalplan: number;
    /**
     * Default Renewal Price Book
     */
    defaultrenewalpricebook: number;
    /**
     * Default Renewal Term |
     * This is optional when Initial Term is Evergreen.
     */
    defaultrenewalterm: number;
    /**
     * Default Renewal Transaction Type
     */
    defaultrenewaltrantype: number;
    /**
     * End Date
     */
    enddate: Date;
    /**
     * Estimated Revenue Recognition End Date
     */
    estimatedrevrecenddate: Date;
    /**
     * External ID
     */
    externalid: string;
    /**
     * Billing Frequency |
     * NetSuite lists this as a select field, but it is a string value (e.g. MONTHLY).
     */
    frequency: number | string;
    /**
     * Subscription ID
     */
    idnumber: string | null;
    /**
     * Initial Term
     */
    initialterm: number;
    /**
     * Initial Term Duration
     */
    initialtermduration: number;
    /**
     * Initial Term Type |
     * NetSuite lists this as a select field, but it is a string value (e.g. EVERGREEN).
     */
    initialtermtype: number;
    /**
     * Initial Term Units |
     * NetSuite lists this as a select field, but it is a string value (e.g. MONTHS).
     */
    initialtermunits: number | string;
    /**
     * Internal ID
     */
    internalid: number;
    /**
     * Last Bill Cycle Date
     */
    lastbillcycledate: Date;
    /**
     * Last Bill Date
     */
    lastbilldate: Date;
    /**
     * Subscription Name
     */
    name: string;
    /**
     * Next Bill Cycle Date
     */
    nextbillcycledate: Date;
    /**
     * Next Renewal Start Date
     */
    nextrenewalstartdate: Date;
    /**
     * Other Record Number
     */
    otherrecordnumber: string;
    /**
     * Price Book
     */
    pricebook: number;
    /**
     * Number of Renewal
     */
    renewalnumber: number;
    /**
     * Originating Sales Order
     */
    salesorder: number;
    /**
     * Start Date |
     * As of 1/20/22, NetSuite says this is not a required field, which is incorrect. It is most likely being confused with billingaccountstartdate.
     */
    startdate: Date;
    /**
     * Subscription Plan
     */
    subscriptionplan: number;
    /**
     * Subscription Plan Name
     */
    subscriptionplanname: string;
    /**
     * Subscription Revision
     */
    subscriptionrevision: number;
    /**
     * Template Stored
     */
    templatestored: boolean;
    /**
     * Subsidiary
     */
    subsidiary: number;
    /**
     * priceinterval - Price Book Lines (Sublist)
     */
    priceinterval: Sublist<PriceBookLinesSublist>;
    /**
     * sublinefromplan - Lines (Sublist)
     */
    sublinefromplan: Sublist<SublineFromPlanSublist>;
    /**
     * subscriptionline - Lines (Sublist)
     */
    subscriptionline: Sublist<SubscriptionLineSublist>;
    static recordType(): record.Type;
}
