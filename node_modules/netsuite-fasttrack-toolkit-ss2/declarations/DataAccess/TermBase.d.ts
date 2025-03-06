import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * NetSuite Project record type
 */
export declare class TermBase extends NetsuiteRecord {
    /**
     * STANDARD
     */
    datedriven: boolean;
    /**
     * Day Discount Expires
     */
    daydiscountexpires: number;
    /**
     * Day Of Month Net Due
     */
    dayofmonthnetdue: number;
    /**
     * Days Till Discount Expires
     */
    daysuntilexpiry: number;
    /**
     * Days Till Net Due
     */
    daysuntilnetdue: number;
    /**
     * % Discount
     */
    discountpercent: number;
    /**
     * % Discount
     */
    discountpercentdatedriven: number;
    /**
     * Due Next Month If Within Days
     */
    duenextmonthifwithindays: number;
    /**
     * Installment
     */
    installment: boolean;
    /**
     * External ID
     */
    externalid: string;
    /**
     * Inactive
     */
    isinactive: boolean;
    /**
     * Terms
     */
    name: string;
    /**
     * Preferred
     */
    preferred: boolean;
    /**
     * Recurrence Count
     */
    recurrencecount: number;
    /**
     * Recurrence Frequency
     */
    recurrencefrequency: number;
    /**
     * Repeat Every
     */
    repeatevery: number;
    /**
     * Split Evenly
     */
    splitevenly: boolean;
    static recordType(): record.Type;
}
