/**
 * NetSuite Credit Card Charge Record
 */
import * as record from 'N/record';
import { TransactionBase } from './Transaction';
import { SublistLine } from './Sublist';
/**
 * NetSuite Credit Card Charge Record
 */
export declare class CreditCardChargeBase extends TransactionBase {
    static recordType(): record.Type.CREDIT_CARD_CHARGE;
    account: number;
    balance: number;
    class: number;
    cleared: boolean;
    cleareddate: Date;
    createddate: Date;
    currency: number;
    currencyname: string;
    currencysymbol: string;
    customform: number;
    department: number;
    entity: number;
    entity_nexus_country: string;
    entitynexus: number;
    exchangerate: number;
    externalid: string;
    isbasecurrency: boolean;
    lastmodifieddate: Date;
    location: number;
    memo: string;
    nexus: number;
    nexus_country: string;
    postingperiod: number;
    subsidiary: number;
    taxperiod: string;
    taxpointdate: Date;
    taxpointdateoverride: boolean;
    total: number;
    trandate: Date;
    tranid: string;
    transactionnumber: string;
    trantype: boolean;
    updatecurrency: string;
    usertotal: number;
}
/**
 * Sublist 'item' on Credit Card Charges
 */
export declare class ItemSublist extends SublistLine {
    amount: number;
    billvariancestatus: string;
    catchupperiod: number;
    class: number;
    customer: number;
    deferrevrec: boolean;
    department: number;
    description: string;
    id: string;
    isbillable: boolean;
    isvsoebundle: string;
    item: number;
    itemsubtype: string;
    itemtype: string;
    line: string;
    linenumber: number;
    linked: string;
    location: number;
    matrixtype: string;
    options: string;
    printitems: string;
    quantity: number;
    rate: number;
    rateschedule: string;
    vendorname: string;
}
/**
 * Sublist 'expense' on Credit Card Charges
 */
export declare class ExpenseSublist extends SublistLine {
    account: number;
    amount: number;
    category: string;
    class: number;
    customer: number;
    department: number;
    expenseitem: number;
    isbillable: boolean;
    line: number;
    location: number;
    memo: string;
    numrules: number;
}
/**
 * Sublist 'reimbursements' on Credit Card Charges
 */
export declare class ReimbursementsSublist extends SublistLine {
    id: string;
}
