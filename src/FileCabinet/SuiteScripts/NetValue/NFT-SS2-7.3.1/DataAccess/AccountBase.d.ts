/**
 * NS Account record - contains definitions for most of the built in fields
 */
import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
import { Sublist, SublistLine } from './Sublist';
/**
 * Localization sublist (localizations)
 */
export declare class LocalizationSublist extends SublistLine {
    accountingcontext: number;
    acctname: string;
    acctnumber: string;
    legalname: string;
    locale: number;
}
/**
 * NetSuite Account (account)
 */
export declare class AccountBase extends NetsuiteRecord {
    static recordType(): record.Type;
    acctname: string;
    accountnumber: string;
    accttype: number;
    accttype2: string;
    billableexpensesacct: number;
    cashflowrate: number;
    category1099misc: number;
    class: number;
    currency: number;
    deferralacct: number;
    department: number;
    description: string;
    eliminate: boolean;
    externalid: string;
    generalrate: number;
    includechildren: boolean;
    inventory: boolean;
    isinactive: boolean;
    legalname: string;
    location: number;
    openingbalance: string;
    parent: number;
    restricttoaccountingbook: number;
    revalue: boolean;
    subsidiary: number[];
    trandate: Date;
    unit: number;
    unitstype: number;
    localizations: Sublist<LocalizationSublist>;
}
