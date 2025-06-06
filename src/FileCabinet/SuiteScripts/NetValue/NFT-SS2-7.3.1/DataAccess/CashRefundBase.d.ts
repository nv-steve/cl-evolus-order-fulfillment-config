/**
 * Represents a Cash Refund (cashrefund) transaction type in NetSuite
 */
import * as record from 'N/record';
import { TransactionBase } from './Transaction';
import { SublistLine } from './Sublist';
export declare class CashRefundBase extends TransactionBase {
    static recordType(): record.Type;
    account: number;
    ccapproved: boolean;
    ccexpiredate: string;
    ccname: string;
    ccnumber: string;
    paymentmethod: number;
    pnrefnum: string;
    total: number;
}
export declare class ItemSublist extends SublistLine {
    amount: number;
    item: number;
    quantity: number;
    revrecstartdate: Date;
    revrecenddate: Date;
    rate: number;
    taxcode: number;
    taxrate1: number;
}
