import { NetsuiteRecord } from './Record';
import { Sublist, SublistLine } from "./Sublist";
import * as record from 'N/record';
/**
 * Lines Sublist (member)
 */
export declare class LinesSublist extends SublistLine {
    /**
     * Billing Mode
     * NetSuite says this is a select field, but the value is a string.
     */
    billingmode: number | string;
    /**
     * Item
     */
    item: number;
    /**
     * Required
     */
    isrequired: boolean;
    /**
     * Line ID
     */
    lineid: number;
    /**
     * Prorate End Date
     */
    prorateenddate: boolean;
    /**
     * Prorate Start Date
     */
    proratestartdate: boolean;
    /**
     * Include In Renewal Subscription
     * NetSuite says this is a select field, but the value is a string.
     */
    renewaloption: number | string;
    /**
     * Type
     */
    subscriptionlinetype: number;
}
/**
 * NetSuite Subscription Plan record type
 */
export declare class SubscriptionPlanBase extends NetsuiteRecord {
    advancerenewalperiodnumber: number;
    advancerenewalperiodunit: number;
    /**
     * Automatically Initiate Renewal Process
     */
    autorenewal: boolean;
    /**
     * Class
     */
    class: number;
    /**
     * Date Created
     */
    createddate: Date;
    /**
     * Default Renewal Method
     */
    defaultrenewalmethod: number;
    /**
     * Default Renewal Subscription Plan
     */
    defaultrenewalplan: number;
    /**
     * Default Renewal Term
     */
    defaultrenewalterm: number;
    /**
     * Default Renewal Transaction Type
     */
    defaultrenewaltrantype: number;
    /**
     * Department
     */
    department: number;
    /**
     * Description
     */
    description: string;
    /**
     * Display Name/Code
     */
    displayname: string;
    /**
     * External ID
     */
    externalid: string;
    /**
     * Include Children
     */
    includechildren: boolean;
    /**
     * Income Account
     */
    incomeaccount: number;
    /**
     * Initial Term
     */
    initialterm: number;
    /**
     * Inactive
     */
    isinactive: boolean;
    /**
     * Subscription Plan Name
     */
    itemid: string;
    /**
     * Item Type
     */
    itemtype: string;
    /**
     * Last Modified
     */
    lastmodifieddate: Date;
    /**
     * Location
     */
    location: number;
    /**
     * Subsidiary
     */
    subsidiary: number;
    /**
     * member - Lines (sublist)
     */
    member: Sublist<LinesSublist>;
    static recordType(): record.Type;
}
