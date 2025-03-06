import { Sublist, SublistLine } from './Sublist';
import { TransactionBase } from './Transaction';
import * as record from 'N/record';
export declare class ApplySublist extends SublistLine {
    amount: string;
    apply: boolean;
    applydate: Date;
    createdfrom: string;
    doc: string;
    due: string;
    duedate: Date;
    job: number;
    line: number;
    refnum: string;
    total: string;
    url: string;
}
/**
 *
 */
export declare class DepositApplicationBase extends TransactionBase {
    static recordType(): record.Type;
    aracct: number;
    currency: number;
    customer: number;
    deposit: number;
    depositdate: Date;
    apply: Sublist<ApplySublist>;
}
