/**
 * Represents an Deposit record (deposit) in NetSuite
 */
import { NetsuiteRecord } from './Record';
import { SublistLine, Sublist } from './Sublist';
import * as record from 'N/record';
/**
 * Deposit payments sublist
 */
export declare class PaymentsSublist extends SublistLine {
    'class': number;
    currency: number;
    department: string;
    deposit: boolean;
    docdate: Date;
    docnumber: string;
    entity: number;
    id: number;
    lineid: string;
    location: number;
    memo: string;
    paymentamount: number;
    paymentmethod: number;
    pmtcurrencyprecision: string;
    refnum: string;
    transactionamount: number;
    /**
     * This is a select list but not the standard numeric type.
     * It contains string ids like 'CashSale' or 'CashRfnd'
     */
    type: string;
}
/**
 * Deposit Record Header
 */
export declare class DepositBase extends NetsuiteRecord {
    static recordType(): record.Type;
    account: number;
    class: number;
    createddate: Date;
    creditcardprocessor: number;
    department: number;
    exchangerate: number;
    location: number;
    memo: string;
    postingperiod: number;
    subsidiary: number;
    tobeprinted: boolean;
    total: number;
    trandate: Date;
    tranid: string;
    payment: Sublist<PaymentsSublist>;
}
