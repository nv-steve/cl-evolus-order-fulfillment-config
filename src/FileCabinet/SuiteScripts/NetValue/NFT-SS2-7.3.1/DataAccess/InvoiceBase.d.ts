/**
 * NetSuite generic Transaction record
 */
import { Sublist, SublistLine } from './Sublist';
import * as record from 'N/record';
import { TransactionBase } from './Transaction';
import { AddressBase } from './AddressBase';
/**
 * The 'item' sublist on invoices
 */
export declare class ItemSublist extends SublistLine {
    account: string;
    amount: number;
    description: string;
    istaxable: boolean;
    item: number;
    linenumber: number;
    price: number;
    quantity: number;
    rate: number;
    revrecstartdate: Date;
    revrecenddate: Date;
    taxcode: number;
    taxrate1: number;
    units: number;
}
/**
 * The Billable Expenses (expcost) sublist fields
 */
export declare class ExpCostSublist extends SublistLine {
    amortizationperiod: string;
    amortizationtype: string;
    amount: number | string;
    apply: boolean;
    billeddate: Date;
    category: string;
    doc: number;
    employee: string;
    job: string;
    line: number;
    location: number;
    memo: string;
    originalamount: number | string;
    revrecenddate: Date;
    revrecschedule: number;
    revrecstartdate: Date;
    taxable: string;
    taxcode: number;
    taxrate1: string | number;
    isbillable?: boolean;
    url: string;
}
/**
 * The Billable Items (itemcost) sublist fields
 */
export declare class ItemCostSublist extends SublistLine {
    amortizationperiod: string;
    amortizationtype: string;
    amount: number | string;
    apply: boolean;
    billeddate: Date;
    binnumbers: string;
    cost: number | string;
    doc: number;
    item: number;
    itemcostcount: string;
    job: string;
    line: number;
    location: number;
    memo: string;
    options: string;
    rateschedule: string;
    revrecenddate: Date;
    revrecschedule: number;
    revrecstartdate: Date;
    serialnumbers: string;
    taxable: string;
    taxcode: number;
    taxrate1: string | number;
    unit: string;
    isbillable?: boolean;
    url: string;
}
/**
 * NetSuite Invoice Record
 */
export declare class InvoiceBase extends TransactionBase {
    static recordType(): record.Type;
    account: number;
    althandlingcost: string | number;
    altshippingcost: string | number;
    amountpaid: number;
    amountremaining: number;
    approvalstatus: number;
    balance: number;
    billingaddress: AddressBase;
    billaddress: string;
    billaddresslist: number;
    billaddr1: string;
    billaddr2: string;
    billaddr3: string;
    billphone: string;
    billstate: string;
    billzip: string;
    billingaccount: number;
    canhavestackable: boolean;
    class: number;
    couponcode: number;
    createdfrom: number;
    currency: number;
    currencyname: string;
    currencysymbol: string;
    discountamount: number;
    discountitem: number;
    discountdate: Date;
    discountrate: number | string;
    discounttotal: number | string;
    duedate: Date;
    enddate: Date;
    entitynexus: number;
    excludecommission: boolean;
    fob: string;
    giftcertapplied: number;
    handlingcost: number;
    handlingtaxcode: number;
    leadsource: number;
    message: string;
    messagesel: number;
    linkedtrackingnumbers: string;
    opportunity: number;
    partner: number;
    promocode: number;
    recurringbill: boolean;
    saleseffectivedate: Date;
    salesgroup: number;
    shippingaddress: AddressBase;
    shipdate: Date;
    shipmethod: number;
    shipoverride: string;
    taxitem: number;
    taxrate: number | string;
    taxregoverride: boolean;
    tobeemailed: boolean;
    tobeprinted: boolean;
    tobefaxed: boolean;
    total: number;
    subtotal: number;
    trackingnumbers: string;
    tranisvsoebundle: boolean;
    vsoeautocalc: boolean;
    item: Sublist<ItemSublist>;
    expcost: Sublist<ExpCostSublist>;
    itemcost: Sublist<ItemCostSublist>;
}
