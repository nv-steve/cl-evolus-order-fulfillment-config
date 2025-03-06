/**
 * NetSuite Expense Report record
 */
import { TransactionBase } from './Transaction';
import { Sublist, SublistLine } from './Sublist';
import * as record from 'N/record';
/**
 * The 'expense' sublist
 */
export declare class ExpenseSublist extends SublistLine {
    amount: number;
    category: number;
    class: number;
    customer: number;
    department: number;
    expenseaccount: number;
    expensedate: Date;
    expenseitem: number;
    line: number;
    location: number;
    memo: string;
    quantity: number;
    rate: number;
    refnumber: string;
}
/**
 * NetSuite Expense Report Record Type
 */
export declare class ExpenseReportBase extends TransactionBase {
    account: number;
    amount: number;
    approvalstatus: string;
    class: number;
    duedate: Date;
    transactionnumber: string;
    items: Sublist<ExpenseSublist>;
    static recordType(): record.Type;
}
