/**
 * NS Base service item record - contains definitions for most of the built in fields
 */
import { Sublist, SublistLine } from './Sublist';
import * as record from 'N/record';
import { Item } from './Item';
export declare class AccountingBooksSublist extends SublistLine {
    acocuntingbook: number;
    amoritizationtemplate: number;
    createrevenueplanson: number;
    revenuerecognitionrule: number;
    revrecforecastrule: number;
    revrecschedule: number;
    sameasprimaryamoritization: boolean;
    sameasprimaryrevrec: boolean;
}
export declare class HierarchyVersionsSublist extends SublistLine {
    hierarchynode: number;
    isincluded: boolean;
}
export declare class WebSiteListSublist extends SublistLine {
    category: number;
    categorydescription: string;
    isdefault: boolean;
    website: number;
}
export declare class ItemTranslationSublist extends SublistLine {
    displayname: string;
    featureddescription: string;
    language: string;
    nopricemessage: string;
    outofstockmessage: string;
    storedisplayname: string;
}
/**
 * NetSuite Service Item
 */
export declare class ServiceItemBase extends Item {
    amortizationperiod: number;
    auctionquantity: number;
    auctiontype: number;
    costestimate: number;
    costestimatetype: number;
    costunits: string;
    createjob: boolean;
    currency: string;
    dontshowprice: boolean;
    expenseaccount: number;
    featureddescription: string;
    gallery: boolean;
    internalid: number;
    issueproduct: number;
    matrixtype: number;
    maximumquantity: number;
    minimumquantity: number;
    mossapplies: boolean;
    nopricemessage: string;
    offersupport: boolean;
    outofstockbehvaior: number;
    overheadtype: number;
    pagetitle: string;
    pricinggroup: number;
    primarycategory: number;
    purchaseunit: number;
    reserveprice: number;
    revrecforecastrule: number;
    salesunit: number;
    urlcomponent: string;
    vendorname: string;
    willship: 'T' | 'F';
    accountingbookdetail: Sublist<AccountingBooksSublist>;
    hierarchyversions: Sublist<HierarchyVersionsSublist>;
    sitecategory: Sublist<WebSiteListSublist>;
    translations: Sublist<ItemTranslationSublist>;
    static recordType(): record.Type;
}
