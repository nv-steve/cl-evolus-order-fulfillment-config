import { TransactionBase } from './Transaction';
import * as record from 'N/record';
import { InventoryDetailBase } from './InventoryDetailBase';
import { SublistLine } from './Sublist';
/**
 * Work Order Completion Components sublist.
 */
export declare class ComponentSublist extends SublistLine {
    item: number;
    linenumber: number;
    quantity: number;
    quantityper: number;
    unitcost: number;
    componentinventorydetail: InventoryDetailBase;
}
/**
 * NetSuite Work Order Completion record type
 */
export declare class WorkOrderCompletionBase extends TransactionBase {
    completedquantity: number;
    endoperation: number;
    isbackflush: boolean;
    manufacturingrouting: number;
    orderquantity: number;
    revision: number;
    revisionmemo: string;
    scrapquantity: number;
    startoperation: number;
    item: number;
    quantity: string;
    unitcost: number;
    units: number;
    inventorydetail: InventoryDetailBase;
    static recordType(): record.Type;
}
