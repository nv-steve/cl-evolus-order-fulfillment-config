/**
 * NS Base Inventory Detail subrecord contains definitions for the built in fields
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
import { Sublist, SublistLine } from './Sublist';
export declare class InventoryAssignmentSublist extends SublistLine {
    binnumber: number;
    expirationdate: Date;
    internalid: number;
    /**
     * Use this field for Sales Orders and Item Fulfillments.
     */
    issueinventorynumber: number;
    /**
     * set this field on Purchase Orders and Item Receipts
     * Setting this field and saving the parent record results in an InventoryNumber
     * record being created automatically behind the scenes.
     */
    receiptinventorynumber: string;
    quantity: number;
    quantityavailable: number;
    tobinnumber: number;
    toinventorystatus: number;
}
/**
 * The inventory detail 'subrecord'. In SS2.0 this is mostly treated as a normal record object.
 * However I caution against trying to create new instances of it, only passing an existing record
 * to the constructor.
 */
export declare class InventoryDetailBase extends NetsuiteRecord {
    static recordType(): record.Type;
    item: number;
    itemdescription: string;
    location: number;
    quantity: number;
    tolocation: number;
    unit: number;
    inventoryassignment: Sublist<InventoryAssignmentSublist>;
}
