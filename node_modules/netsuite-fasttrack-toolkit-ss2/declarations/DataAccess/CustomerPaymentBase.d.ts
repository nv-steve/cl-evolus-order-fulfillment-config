/**
 * NetSuite Customer Payment (customerpayment) record
 */
import { SublistLine, Sublist } from './Sublist';
import * as record from 'N/record';
import { TransactionBase } from './Transaction';
export declare class ApplySublist extends SublistLine {
    amount: number;
    apply: boolean;
    applydate: Date;
    createdfrom: string;
    disc: number;
    doc: string;
    discamt: number;
    internalid: string;
    job: number;
    line: number;
    refnum: string;
    total: number;
    url: string;
}
/**
 * Customer Payment Record
 */
export declare class CustomerPaymentBase extends TransactionBase {
    static recordType(): record.Type;
    customer: number;
    checknum: string;
    payment: number;
    paymentmethod: number;
    autoapply: boolean;
    apply: Sublist<ApplySublist>;
}
