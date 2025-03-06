import { TransactionBase } from './Transaction';
import { Sublist, SublistLine } from './Sublist';
import * as record from 'N/record';
/**
 * Vendor Credit Expense Sublist
 */
export declare class ExpenseSublist extends SublistLine {
    account: number;
    amount: number | string;
    memo: string;
    department: number;
    location: number;
    expense: number;
}
/**
 * Vendor Credit Item Sublist
 */
export declare class ItemSublist extends SublistLine {
    account: number;
    amount: number | string;
    memo: string;
    item: number;
}
/**
 * Vendor Credit Apply Sublist
 */
export declare class ApplySublist extends SublistLine {
    apply: boolean;
    amount: number | string;
    applydate: Date;
    doc: string;
}
/**
 * Vendor Credit record Type
 */
export declare class VendorCreditBase extends TransactionBase {
    autoapply: boolean;
    account: number;
    item: Sublist<ItemSublist>;
    expense: Sublist<ExpenseSublist>;
    apply: Sublist<ApplySublist>;
    static recordType(): record.Type;
}
