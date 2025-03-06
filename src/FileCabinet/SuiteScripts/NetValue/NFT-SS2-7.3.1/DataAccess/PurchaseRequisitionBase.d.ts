import { NetsuiteRecord } from './Record';
import { Sublist, SublistLine } from './Sublist';
import { InventoryDetailBase } from './InventoryDetailBase';
import * as record from 'N/record';
/**
 * Purchase Requisition Item Sublist
 */
export declare class ItemSublist extends SublistLine {
    amount: number;
    class: number;
    createpo: string;
    customer: number;
    department: number;
    description: string;
    /**
     * Inventory Detail subrecord
     */
    inventorydetail: InventoryDetailBase;
    isbillable: boolean;
    isclosed: boolean;
    item: number;
    line: string;
    linkedorder: number;
    linkedorderstatus: string;
    povendor: number;
    quantity: number;
    quantityreceived: number;
    rate: number;
    serialnumbers: string;
    units: number;
    vendorname: string;
}
/**
 * Purchase Requisition Expense Sublist
 */
export declare class ExpenseSublist extends SublistLine {
    account: number;
    amount: number;
    category: number;
    class: number;
    customer: number;
    department: number;
    isbillable: boolean;
    isclosed: boolean;
    line: string;
    linkedorder: number;
    linkedorderstatus: string;
    location: number;
    memo: string;
    povendor: number;
}
/**
 * NetSuite Purchase Requisition record type
 * (known as "Requisition" in record browser)
 */
export declare class PurchaseRequisitionBase extends NetsuiteRecord {
    static recordType(): record.Type;
    approvalstatus: number;
    class: number;
    createddate: Date;
    createdfrom: number;
    currency: number;
    customform: number;
    department: number;
    duedate: Date;
    entity: number | string;
    entitynexus: number;
    estimatedtotal: number;
    externalid: string;
    linkedtrackingnumber: string;
    location: number;
    memo: string;
    message: string;
    nextapprover: number;
    nexus: number;
    returntrackingnumbers: number;
    shipdate: Date;
    source: string;
    status: number;
    statusRef: string;
    subsidiary: number;
    terms: number;
    total: number;
    trackingnumbers: string;
    trandate: Date;
    tranid: string;
    item: Sublist<ItemSublist>;
    expense: Sublist<ExpenseSublist>;
}
