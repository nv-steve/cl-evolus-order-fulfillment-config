/**
 * NetSuite Charge Record
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * NetSuite Charge {charge} record type
 */
export declare class ChargeBase extends NetsuiteRecord {
    static recordType(): record.Type.CHARGE;
    amount: number;
    billingaccount: number;
    billingitem: number;
    billto: number;
    chargedate: Date;
    chargetype: number;
    class: number;
    createddate: Date;
    currency: number;
    department: number;
    description: string;
    invoice: number;
    invoiceline: string;
    location: number;
    projecttask: number;
    quantity: number;
    rate: number;
    rule: number;
    runid: string;
    salesorder: number;
    salesorderline: number;
    stage: number;
    subscriptionline: number;
    timerecord: number;
    transaction: number;
    transactionline: number;
    use: number;
}
