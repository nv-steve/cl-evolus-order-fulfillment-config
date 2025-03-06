/**
 * Represents an Item Fulfillment (itemfulfillment) transaction type in NetSuite
 */
import * as record from 'N/record';
import { TransactionBase } from './Transaction';
import { Sublist, SublistLine } from './Sublist';
import { AddressBase } from './AddressBase';
/**
 * This is the undocumented but standard package sublist. This sublist has shown to be stable and scriptable for some time so
 * including here even though not documented.
 */
export declare class PackageSublist extends SublistLine {
    packagetrackingnumber: string;
    packageweight: number;
    pkgTrackingNumberKey: number;
    pkgTrackingNumberUrl: string;
    trackingnumberkey: number;
}
/**
 * Item Fulfillment Items (item) sublist
 */
export declare class ItemSublist extends SublistLine {
    "class": string;
    countryofmanufacture: string;
    inventorydetailreq?: 'T' | 'F';
    isnumbered?: string;
    item: string;
    itemreceive: boolean;
    itemtype: string;
    /**
     * field only applies to kit items
     */
    kitlineid?: string;
    /**
     * field only applies to kit items
     */
    kitlevel?: string;
    location: number;
    onhand: number;
    quantity: number;
    quantityremaining: number;
    /**
     * lookup to the units of measure type (SuiteQL table name unitstypeuom)
     */
    units: number;
}
/**
 * Item Fulfillment Base Type
 */
export declare class ItemFulfillmentBase extends TransactionBase {
    static recordType(): record.Type;
    /**
     * This field shows the transaction this fulfillment was created from.
     */
    createdfrom: number;
    handlingcost: number | string;
    shippingaddress: AddressBase;
    shipstatus: string;
    shippeddate: Date;
    shipmethod: number;
    shippingcost: number | string;
    termsofsalefedex: number;
    item: Sublist<ItemSublist>;
    /**
     * The sublist for shipping info used by default (if not using more advanced shipping integration options).
     */
    package: Sublist<PackageSublist>;
}
