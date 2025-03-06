/**
 * NetSuite cash sale Transaction record
 */
import { Sublist, SublistLine } from './Sublist';
import * as record from 'N/record';
import { TransactionBase } from './Transaction';
import { AddressBase } from './AddressBase';
/**
 * The 'item' sublist on invoices
 */
export declare class ItemSublist extends SublistLine {
    amount: number;
    description: string;
    istaxable: boolean;
    item: number;
    linenumber: number;
    price: number;
    quantity: number;
    rate: number;
    revrecstartdate: Date;
    revrecenddate: Date;
    /**
     * This field only exists if `ismultishipto === true` and record is in _dynamic mode_
     * @experimental
     */
    shippingaddress: AddressBase;
    taxcode: number;
    taxrate1: number;
    units: number;
}
/**
 * NetSuite Cashsale Record
 */
export declare class CashSaleBase extends TransactionBase {
    static recordType(): record.Type;
    account: number;
    billaddr1: string;
    billaddr2: string;
    billaddr3: string;
    billphone: string;
    billstate: string;
    billzip: string;
    billingaddress: AddressBase;
    billaddress: string;
    ccapproved: boolean;
    createdfrom: number;
    currency: number;
    discounttotal: number;
    exchangerate: number;
    fob: string;
    giftcertapplied: number;
    handlingcost: number;
    handlingtaxcode: number;
    ismultishipto: boolean;
    item: Sublist<ItemSublist>;
    leadsource: number;
    linkedtrackingnumbers: string;
    partner: number;
    paymentmethod: number;
    pnrefnum: string;
    promocode: number;
    shippingaddress: AddressBase;
    subtotal: number;
    taxitem: number;
    tobeemailed: boolean;
    tobefaxed: boolean;
    tobeprinted: boolean;
    trackingnumbers: string;
    total: number;
}
