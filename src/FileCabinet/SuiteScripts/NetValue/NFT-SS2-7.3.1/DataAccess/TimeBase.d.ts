/**
 * Created by asariego on 4/8/24.
 */
import * as record from 'N/record';
import { TransactionBase } from './Transaction';
/**
 * NetSuite Time Record
 */
export declare class TimeBase extends TransactionBase {
    static recordType(): record.Type;
    approvalstatus: number;
    casetaskevent: number;
    class: number;
    customer: number;
    customform: number;
    department: number;
    employee: number;
    externalid: string;
    hours: string;
    isbillable: boolean;
    isexempt: boolean;
    isproductive: boolean;
    isutilized: boolean;
    item: number;
    location: number;
    memo: string;
    overriderate: string;
    paidexternally: boolean;
    payrollitem: number;
    price: string;
    projecttaskassignment: number;
    rate: string;
    rejectionnote: string;
    serviceitem: number;
    subsidiary: number;
    supervisorapproval: boolean;
    timemodified: boolean;
    timesheet: number;
    timetype: number;
    trandate: Date;
}
