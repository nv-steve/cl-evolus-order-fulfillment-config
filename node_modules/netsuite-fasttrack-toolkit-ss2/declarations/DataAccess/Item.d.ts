import { NetsuiteRecord } from './Record';
/**
 * Base class with fields common to all item types
 */
export declare class Item extends NetsuiteRecord {
    autoleadtime: boolean;
    autopreferredstocklevel: boolean;
    availabletopartners: boolean;
    assetaccount: number;
    atpmethod: number;
    averagecost: number;
    billingschedule: number;
    billpricevariantacct: number;
    class: number;
    cogsaccount: number;
    consumptionunit: number;
    copydescription: boolean;
    cost: number;
    costcategory: number;
    costingmethod: number;
    /**
     * This is a 'select' field according to records browser but actually requires the two character country code
     * for values.
     */
    countryofmanufacture: string;
    createddate: Date;
    customform: number;
    deferredrevenueaccount: number;
    deferrevrec: boolean;
    department: number;
    description: string;
    displayname: string;
    externalid: string;
    includechildren: boolean;
    incomeaccount: number;
    isdonationitem: boolean;
    isdropshipitem: boolean;
    isgcocompliant: boolean;
    isinactive: boolean;
    isonline: boolean;
    isspecialorderitem: boolean;
    isstorepickupallowed: boolean;
    itemcondition: number;
    itemid: string;
    itemoptions: number;
    itemtype: string;
    lastmodifieddate: Date;
    location: number;
    parent: number;
    purchasedescription: string;
    revrecschedule: number;
    subsidiary: number;
    upccode: string;
    taxschedule: number;
    tracklandedcost: boolean;
    tranid: string;
    units: number;
    unitstype: number;
    usebins: boolean;
    weight: number;
    weightunit: number;
}
