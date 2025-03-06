/**
 * Represents an Check (check) transaction type in NetSuite
 */
import { Sublist, SublistLine } from './Sublist';
import { TransactionBase } from './Transaction';
import * as record from 'N/record';
/**
 * Check (expense) sublist definition
 */
export declare class ExpenseSublist extends SublistLine {
    account: number;
    amount: number;
    class: number;
    customer: number;
    isbillable: boolean;
    location: number;
    memo: string;
}
/**
 * Check (item) sublist definition
 */
export declare class ItemSublist extends SublistLine {
    amount: number | string;
    catchupperiod: number;
    class: number;
    customer: number;
    deferrevrec: boolean;
    department: number;
    description: string;
    isbillable: boolean;
    item: number;
    itemsubtype: string;
    itemtype: string;
    line: string;
    linenumber: number;
    location: number;
    matrixtype: string;
    options: any;
    quantity: number | string;
    rate: number | string;
    taxcode: number;
    taxrate1: number | string;
    units: number;
    vendorname: string;
}
/**
 *  NetSuite Check Record definition
 */
export declare class CheckBase extends TransactionBase {
    static recordType(): record.Type.CHECK;
    account: number;
    balance: number | string;
    billpay: boolean;
    class: number;
    currency: number;
    currencyname: string;
    entitynexus: number;
    exchangerate: number | string;
    isbasecurrency: boolean;
    landedcostperline: boolean;
    nexus: number;
    payeeaddresslist: number;
    tobeprinted: boolean;
    total: number | string;
    usertotal: number | string;
    expense: Sublist<ExpenseSublist>;
    item: Sublist<ItemSublist>;
}
