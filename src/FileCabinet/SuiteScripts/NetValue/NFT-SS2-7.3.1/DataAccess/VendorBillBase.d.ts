/**
 * NetSuite Vendor Bill record
 */
import { SublistLine, Sublist } from './Sublist';
import * as record from 'N/record';
import { TransactionBase } from './Transaction';
import { AddressBase } from './AddressBase';
/**
 * Sublist 'item' on the Vendor Bill record
 */
export declare class ItemSublist extends SublistLine {
    item: number;
    quantity: number;
    amount: number;
    rate: number;
    location: number;
}
/**
 * Sublist 'expense' on the Vendor Bill record
 */
export declare class ExpenseSublist extends SublistLine {
    account: number;
    amount: number;
    categoryexpaccount: number;
    class: number;
    department: number;
    line: number;
    lineuniquekey: string;
    location: number;
    /**
     * Memo
     * Enter a memo that will appear on such reports as the 2-line Accounts Payable Register.
     */
    memo: string;
}
/**
 * NetSuite Vendor Bill Record
 */
export declare class VendorBillBase extends TransactionBase {
    static recordType(): record.Type;
    account: number;
    approvalstatus: number;
    availablevendorcredit: number | string;
    balance: string;
    class: number;
    creditlimit: number | string;
    currency: number;
    currencyname: string;
    currencysymbol: string;
    discountamount: number | string;
    discountdate: Date;
    documentstatus: string;
    duedate: Date;
    entitynexus: number;
    entitytaxregnum: number;
    exchangerate: string | number;
    landedcostperline: boolean;
    nextapprover: number;
    nexus: number;
    overrideinstallments: boolean;
    paymenthold: boolean;
    taxpointdate: Date;
    taxpointdateoverride: boolean;
    taxregoverride: boolean;
    terms: number;
    usertotal: number | string;
    billingaddress: AddressBase;
    item: Sublist<ItemSublist>;
    expense: Sublist<ExpenseSublist>;
}
