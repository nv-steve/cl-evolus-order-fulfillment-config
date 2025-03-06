/**
 * NS Base lead record - contains definitions for most of the built in fields
 */
import { Sublist, SublistLine } from './Sublist';
import * as record from 'N/record';
import { AddressBase } from './AddressBase';
import { Entity } from './Entity';
/**
 * Address sublist
 */
export declare class AddressSublist extends SublistLine {
    addressbookaddress: AddressBase;
    attention: string;
    city: string;
    country: number;
    defaultbilling: boolean;
    defaultshipping: boolean;
    displaystate: string;
    dropdownstate: number;
    id: number;
    internalid: number;
    isresidential: boolean;
    label: string;
    override: boolean;
    phone: string;
    state: string;
    zip: string;
}
/**
 * Contacts sublist
 */
export declare class ContactsSublist extends SublistLine {
    contact: number;
    email: string;
    giveaccess: boolean;
    passwordconfirm: boolean;
    role: number;
    sendemail: boolean;
    strength: string;
}
export declare class CurrenciesSublist extends SublistLine {
    balance: number;
    consolbalance: number;
    consoldepositbalance: number;
    consoloverduebalance: number;
    consolunbilledorders: number;
    currency: number;
    currencyformatsample: string;
    depositbalance: number;
    displaysymbol: string;
    overduebalance: number;
    overridecurrencyformat: boolean;
    symbolplacement: number;
    unbilledorders: number;
}
export declare class DownloadsSublist extends SublistLine {
    expiration: Date;
    file: number;
    licensecode: string;
    remainingdownloads: number;
}
export declare class GroupPricingSublist extends SublistLine {
    group: number;
    level: number;
}
export declare class ItemPricingSublist extends SublistLine {
    currency: number;
    item: number;
    level: number;
    price: number;
}
export declare class PartnersSublist extends SublistLine {
    contribution: number;
    customer: string;
    id: string;
    isprimary: boolean;
    partner: number;
    partnerrole: number;
}
export declare class SalesTeamSublist extends SublistLine {
    contribution: number;
    customer: string;
    employee: number;
    id: string;
    isprimary: boolean;
    issalesrep: string;
    salesrole: number;
}
/**
 * Lead record in NetSuite
 */
export declare class LeadBase extends Entity {
    accessrole: number;
    autoname: boolean;
    buyingreason: number;
    buyingtimeframe: boolean;
    consoldaysoverdue: number;
    creditholdoverride: number;
    currencyprecision: string;
    daysoverdue: number;
    defaultbankaccount: number;
    draccount: number;
    emailtransactions: boolean;
    estimatedbudget: number;
    fxaccount: number;
    globalsubscriptionstatus: number;
    image: number;
    isbudgetapproved: boolean;
    keywords: string;
    lastvisit: string;
    leadsource: number;
    middlename: string;
    negativenumberformat: number;
    numberformat: number;
    partner: number;
    prefccprocessor: number;
    pricelevel: number;
    printoncheckas: string;
    printtransactions: boolean;
    receivablesaccount: number;
    referrer: string;
    resalenumber: string;
    salesgroup: number;
    salesreadiness: number;
    salesrep: number;
    sourcewebsite: number;
    stage: string;
    syncpartnerteams: boolean;
    syncsalesteams: boolean;
    taxable: boolean;
    taxexempt: boolean;
    taxfractionunit: number;
    taxrounding: number;
    territory: number;
    title: string;
    unsubscribe: number;
    visits: number;
    weblead: string;
    addressbook: Sublist<AddressSublist>;
    contactroles: Sublist<ContactsSublist>;
    download: Sublist<DownloadsSublist>;
    grouppricing: Sublist<GroupPricingSublist>;
    itempricing: Sublist<ItemPricingSublist>;
    partners: Sublist<PartnersSublist>;
    salesteam: Sublist<SalesTeamSublist>;
    static recordType(): record.Type;
}
