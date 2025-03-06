import { NetsuiteRecord } from './Record';
import { Sublist, SublistLine } from "./Sublist";
import * as record from 'N/record';
/**
 * Price Book Lines sublist (priceinterval)
 */
export declare class PriceIntervalBase extends SublistLine {
    /**
     * Subscription Line Type
     */
    chargetype: number;
    /**
     * Discount
     */
    discount: number | string | null;
    /**
     * Charge Frequency
     */
    frequency: number | string;
    /**
     * Required
     */
    isrequired: boolean;
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
    multiplierline: number | null;
    /**
     * Price
     */
    price: string;
    /**
     * Price Plan
     */
    priceplan: number;
    /**
     * Repeat Every
     */
    repeatevery: number;
    /**
     * Interval
     */
    startoffsetunit: number | string;
    /**
     * Start On
     */
    startoffsetvalue: number;
    /**
     * Subscription Plan Line
     */
    subscriptionplanline: number;
}
/**
 * NetSuite Price Book (pricebook) record type
 */
export declare class PriceBookBase extends NetsuiteRecord {
    /**
     * Currency
     */
    currency: number;
    /**
     * External ID
     */
    externalid: string;
    /**
     * Internal ID
     */
    internalid: number | null;
    /**
     * Name
     */
    name: string;
    /**
     * Subscription Plan
     */
    subscriptionplan: number;
    /**
     * priceinterval - Price Book Lines (Sublist)
     */
    priceinterval: Sublist<PriceIntervalBase>;
    static recordType(): record.Type;
}
