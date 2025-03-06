import { TransactionBase } from './Transaction';
import { Sublist, SublistLine } from './Sublist';
import { InventoryDetailBase } from './InventoryDetailBase';
import * as record from 'N/record';
/**
 * Work Order Item Sublist
 */
export declare class ItemSublist extends SublistLine {
    item: number;
    price: number;
    quantity: number;
    bomquantity: number;
    rate: number;
    units: number;
    amount: number;
    description: string;
    inventorydetail: InventoryDetailBase;
}
/**
 * NetSuite Work Order record type
 */
export declare class WorkOrderBase extends TransactionBase {
    actualproductionenddate: Date;
    actualproductionstartdate: Date;
    assemblyitem: number;
    billofmaterials: number;
    billofmaterialsrevision: number;
    createdfrom: number;
    enddate: Date;
    firmed: boolean;
    job: number;
    quantity: number;
    startdate: Date;
    units: number;
    item: Sublist<ItemSublist>;
    static recordType(): record.Type;
}
