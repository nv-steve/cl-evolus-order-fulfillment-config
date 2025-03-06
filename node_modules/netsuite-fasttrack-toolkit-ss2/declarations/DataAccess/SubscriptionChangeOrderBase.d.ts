import { NetsuiteRecord } from './Record';
import { Sublist, SublistLine } from "./Sublist";
import * as record from 'N/record';
/**
 * New Lines (newsubline) sublist
 */
export declare class NewSublineSublist extends SublistLine {
    /**
     * Item
     */
    item: string;
    /**
     * Subscription Line
     */
    subscriptionline: string;
}
/**
 * Renewal Steps (renewalsteps) sublist
 */
export declare class RenewalStepsSublist extends SublistLine {
    /**
     * Subscription
     */
    subscription: number;
    /**
     * Transaction
     */
    transaction: number;
}
/**
 * Items (subline) sublist
 */
export declare class SublineSublist extends SublistLine {
    /**
     * Include
     */
    apply: boolean;
    /**
     * Billing Mode
     */
    billingmode: string;
    /**
     * Discount
     */
    discount: number;
    /**
     * New Discount
     */
    discountnew: number;
    /**
     * End Date
     */
    enddate: Date;
    /**
     * Include in Renewal
     */
    includeinrenewal: string;
}
/**
 * Subscription Change Order NetSuite record |
 * On creation, the following default values are required: action and subscription.
 */
export declare class SubscriptionChangeOrderBase extends NetsuiteRecord {
    /**
     * Date Approved
     */
    approvaldate: Date;
    /**
     * Approval Status
     * NetSuite lists this as a select field, but it is a string value (e.g. APPROVED).
     */
    approvalstatus: number | string;
    /**
     * Billing Account
     */
    billingaccount: number;
    /**
     * Created By
     */
    createdby: string;
    /**
     * Customer
     */
    customer: number;
    /**
     * Date Created
     */
    datecreated: Date;
    /**
     * Effective Date
     * This date needs to match any other Change Order effective dates or else NetSuite will throw an error.
     */
    effectivedate: Date;
    /**
     * External ID
     */
    externalid: string;
    /**
     * Number
     */
    idnumber: string;
    /**
     * Memo
     */
    memo: string;
    /**
     * Modification Type
     */
    modificationtype: string;
    /**
     * Reactivation Option
     */
    reactivationoption: number;
    /**
     * Renewal End Date
     */
    renewalenddate: Date;
    /**
     * Renewal Method
     */
    renewalmethod: number;
    /**
     * Renewal Subscription Plan
     */
    renewalplan: number;
    /**
     * Renewal Price Book
     */
    renewalpricebook: number;
    /**
     * Renewal Start Date
     */
    renewalstartdate: Date;
    /**
     * Renewal Term
     */
    renewalterm: number | string;
    /**
     * Renewal Transaction Type
     */
    renewaltrantype: number;
    /**
     * Request Off-Cycle Invoice For Advance Charges
     */
    requestoffcycleinvoice: boolean;
    /**
     * Requester
     */
    requestor: number;
    /**
     * Subscription
     */
    subscription: number;
    /**
     * Subscription Plan
     */
    subscriptionplan: number;
    /**
     * Subscription Term Duration
     */
    subscriptiontermduration: number;
    /**
     * Subscription Term Type
     */
    subscriptiontermtype: string;
    /**
     * Subsidiary
     */
    subsidiary: number;
    /**
     * New Lines (newsubline) Sublist
     */
    newsubline: Sublist<NewSublineSublist>;
    /**
     * Renewal Steps (renewalsteps) Sublist
     */
    renewalsteps: Sublist<RenewalStepsSublist>;
    /**
     * Items (subline) Sublist
     */
    subline: Sublist<SublineSublist>;
    static recordType(): record.Type;
}
