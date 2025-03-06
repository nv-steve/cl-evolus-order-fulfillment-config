/**
 * NetSuite Purchase Order Record
 */
import * as record from 'N/record';
import { TransactionBase } from './Transaction';
import { Sublist, SublistLine } from './Sublist';
import { Nullable } from './Record';
import { AddressBase } from './AddressBase';
/**
 * Sublist 'item' on purchase orders
 */
export declare class ItemSublist extends SublistLine {
    amount: number;
    class: number;
    customer: number;
    deferrevrec: boolean;
    department: number;
    description: string;
    expectedreceiptdate: Date;
    isclosed: boolean;
    item: number;
    location: Nullable<number>;
    leadtime: Nullable<number>;
    quantity: number;
    quantityreceived: number;
    quantitybilled: number;
    rate: number;
    units: number;
    vendorname: string | number;
}
/**
 * NetSuite Purchase Order Record
 */
export declare class PurchaseOrderBase extends TransactionBase {
    approvalstatus: number;
    balance: Nullable<number>;
    class: Nullable<number>;
    createdfrom: Nullable<number>;
    currency: number;
    employee: Nullable<number>;
    incoterm: Nullable<number>;
    intercotransaction: Nullable<number>;
    isbasecurrency: boolean;
    shipdate: Date;
    shipmethod: Nullable<number>;
    shipto: Nullable<number>;
    billingaddress: AddressBase;
    shippingaddress: AddressBase;
    terms: Nullable<number>;
    tobeemailed: Nullable<boolean>;
    tobefaxed: Nullable<boolean>;
    tobeprinted: Nullable<boolean>;
    total: number;
    unbilledorders: Nullable<number>;
    item: Sublist<ItemSublist>;
    static recordType(): record.Type;
}
