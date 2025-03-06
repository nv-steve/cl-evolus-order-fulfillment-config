/**
 *  Represents a Transfer Order (transferorder) transaction type in NetSuite
 */
import { SublistLine } from './Sublist';
import * as record from 'N/record';
import { TransactionBase } from './Transaction';
import { AddressBase } from './AddressBase';
/**
 * NetSuite Transfer Order Record
 */
export declare class TransferOrderBase extends TransactionBase {
    static recordType(): record.Type;
    "class": number;
    createdfrom: number;
    employee: number;
    firmed: boolean;
    nexus: number;
    orderstatus: number;
    shipcomplete: boolean;
    shipdate: Date;
    shippingaddress: AddressBase;
    subtotal: number;
    total: number;
    transferlocation: number;
    useitemcostastransfercost: boolean;
}
/**
 * Sublist 'item' on the Transfer Order record
 */
export declare class ItemSublist extends SublistLine {
    amount: number;
    catchupperiod: number;
    commitinventory: number;
    deferrevrec: string;
    description: string;
    expectedreceiptdate: Date;
    expectedshipdate: Date;
    isclosed: boolean;
    item: number;
    linenumber: number;
    quantity: number;
    quantityavailable: number;
    quantitybackordered: number;
    quantitycommitted: number;
    quantityfulfilled: number;
    quantityreceived: number;
    rate: number;
    units: number;
}
