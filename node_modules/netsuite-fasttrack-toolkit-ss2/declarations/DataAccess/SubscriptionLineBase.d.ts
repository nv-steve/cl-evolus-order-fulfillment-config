import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * NetSuite Subscription Line record type
 */
export declare class SubscriptionLineBase extends NetsuiteRecord {
    advancerenewalperiodnumber: number;
    /**
     * NetSuite lists this as a select field, but often the value is a string (e.g. DAYS).
     */
    advancerenewalperiodunit: number | string;
    /**
     * Billing Account Start Date
     */
    billingaccountstartdate: Date;
    /**
     * Billing Mode
     * NetSuite lists this as a select field, but often the value is a string (e.g. IN_ADVANCE).
     */
    billingmode: number | string;
    /**
     * Catalog Type
     * NetSuite lists this as a select field, but often the value is a string (e.g. OPTIONAL).
     */
    catalogtype: number | string;
    /**
     * Currency
     */
    currency: number;
    /**
     * Custom Form
     */
    customform: number;
    /**
     * End Date
     */
    enddate: Date;
    /**
     * External ID
     */
    externalid: string;
    /**
     * Include In Renewal Subscription
     */
    includeinrenewal: boolean;
    /**
     * Item
     */
    item: number;
    /**
     * Line Number
     */
    linenumber: number;
    /**
     * PO Number
     */
    ponumber: string;
    /**
     * Prorate End Date
     */
    prorateenddate: boolean;
    /**
     * Prorate Start Date
     */
    proratestartdate: boolean;
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
     * Sales Order
     */
    salesorder: number;
    /**
     * Sales Order Line Number
     */
    salesorderlinenumber: number;
    /**
     * Subscription Line Status
     * NetSuite lists this as a select field, but often the value is a string (e.g. ACTIVE).
     */
    subscriptionlinestatus: number | string;
    /**
     * Subscription
     */
    subscription: number;
    /**
     * Subscription Plan
     */
    subscriptionplan: number;
    /**
     * Subscription Line Type
     */
    subscriptionlinetype: number;
    /**
     * Termination Date
     */
    terminationdate: Date;
    /**
     * Total
     */
    total: number | string;
    static recordType(): record.Type;
}
