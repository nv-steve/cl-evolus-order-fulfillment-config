import { TransactionBase } from './Transaction';
import { Sublist, SublistLine } from './Sublist';
import { InventoryDetailBase } from './InventoryDetailBase';
import * as record from 'N/record';
/**
 * Work Order Issue Components sublist.
 */
export declare class ComponentSublist extends SublistLine {
    item: number;
    compitemname: string;
    quantity: number;
    units: number;
    unitsText: string;
    isserial: boolean;
    isnumbered: boolean;
    componentinventorydetail: InventoryDetailBase;
}
/**
 * NetSuite Work Order Issue record type.
 */
export declare class WorkOrderIssueBase extends TransactionBase {
    endoperation: number;
    item: number;
    manufacturingrouting: number;
    revision: number;
    revisionmemo: string;
    startoperation: number;
    component: Sublist<ComponentSublist>;
    static recordType(): record.Type;
}
