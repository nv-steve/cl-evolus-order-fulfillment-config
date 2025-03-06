import { NetsuiteRecord, Nullable } from './Record';
import { Sublist, SublistLine } from "./Sublist";
import * as record from 'N/record';
/**
 * NetSuite Price Plan Price Tiers sublist (pricetiers)
 */
export declare class PriceTiersBase extends SublistLine {
    /**
     * Above Quantity
     */
    fromval: number;
    /**
     * Line ID
     */
    lineid: Nullable<string | number>;
    /**
     * Price Plan
     */
    priceplan: number;
    /**
     * Price Tier
     */
    pricetier: string;
    /**
     * Pricing Option
     */
    pricingoption: number;
    /**
     * Value
     */
    value: number;
}
/**
 * NetSuite Price Plan (priceplan)
 */
export declare class PricePlanBase extends NetsuiteRecord {
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
    internalid: number;
    /**
     * Price Plan Type
     */
    priceplantype: number;
    /**
     * pricetiers  - Price Plan Price Tiers (Sublist)
     */
    pricetiers: Sublist<PriceTiersBase>;
    static recordType(): record.Type;
}
