import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * NetSuite Billing Account record type
 */
export declare class BillingAccountBase extends NetsuiteRecord {
    /**
     * Billing Schedule
     */
    billingschedule: number;
    /**
     * Cash Sale Form
     */
    cashsaleform: number;
    /**
     * Class
     */
    class: number;
    /**
     * Created By
     */
    createdby: string;
    /**
     * Created Date
     */
    createddate: Date;
    /**
     * Currency
     */
    currency: number;
    /**
     * Customer
     */
    customer: number;
    /**
     * Customer Default
     */
    customerdefault: boolean;
    /**
     * Custom Form
     */
    customform: number;
    /**
     * Department
     */
    department: number;
    /**
     * External ID
     */
    externalid: string;
    /**
     * Frequency
     */
    frequency: number;
    /**
     * Account Number
     */
    idnumber: string;
    /**
     * External ID
     */
    idnumberexternal: string;
    /**
     * Inactive
     */
    inactive: boolean;
    /**
     * Invoice Form
     */
    invoiceform: number;
    /**
     *	Last Bill Cycle Date
     */
    lastbillcycledate: Date;
    /**
     * Last Bill Date
     */
    lastbilldate: Date;
    /**
     * Account Description
     */
    memo: string;
    /**
     * Name
     */
    name: string;
    /**
     * Next Bill Cycle Date
     */
    nextbillcycledate: Date;
    /**
     * Start Date
     */
    startdate: Date;
    /**
     * Subsidiary
     */
    subsidiary: number;
    static recordType(): record.Type;
}
