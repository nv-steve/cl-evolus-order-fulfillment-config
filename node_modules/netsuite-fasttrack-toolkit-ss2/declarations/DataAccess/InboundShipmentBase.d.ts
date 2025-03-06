/**
 * NetSuite Inbound Shipment record
 */
import { TransactionBase } from './Transaction';
import { Sublist, SublistLine } from './Sublist';
import * as record from 'N/record';
/**
 * The 'item' sublist
 */
export declare class ItemSublist extends SublistLine {
    id: number;
    currencyprecision: number;
    expectedrate: number;
    fulfillable: boolean;
    fxrate: number;
    inventorydetailavail: boolean;
    inventorydetailid: number;
    isnumbereditem: boolean;
    itemid: number;
    itemtype: string;
    lineid: number;
    ownershiptransferscount: number;
    pocurrency: number;
    porate: number;
    povendor: string | number;
    povendorkey: string | number;
    povendorurl: string;
    purchaseorder: string | number;
    purchaseorderkey: string;
    purchaseorderurl: string;
    quantitybilled: number;
    quantityexpected: number;
    quantityexpectedorig: number;
    quantityreceived: number;
    quantityremaining: number;
    receivinglocation: string | number;
    relatedtransactions: string | number;
    relatedtransactionsurl: string;
    sequencenumber: number;
    shipmentitem: string | number;
    shipmentitemamount: number;
    shipmentitemdescription: string | number;
    shipmentitemeffectivedate: Date;
    shipmentitemexchangerate: number;
    shipmentitemfxrateoverriden: boolean;
    shipmentitemkey: string;
    shipmentitemtext: string;
    shipmentitemurl: string;
    totalunitcost: number;
    tracklandedcost: string | number;
    unit: string;
    unitlandedcost: string;
    unitrate: number;
    vendorid: number;
    weightlbs: string | number;
}
/**
 * The 'landedcost' sublist
 */
export declare class LandedCostSublist extends SublistLine {
    landedcostallocationmethod: string | number;
    landedcostamount: number;
    landedcostcostcategory: string | number;
    landedcostcurrency: number;
    landedcostcurrencyprecision: number;
    landedcosteffectivedate: Date;
    landedcostexchangerate: number;
    landedcostexchangerateoverriden: boolean;
    landedcostid: number;
    landedcostshipmentitems: string[] | number[];
}
/**
 * NetSuite Inbound Shipment Record Type
 */
export declare class InboundShipmentBase extends TransactionBase {
    actualdeliverydate: Date;
    actualshippingdate: Date;
    billoflading: string;
    expecteddeliverydate: Date;
    expectedshippingdate: Date;
    externaldocumentnumber: string;
    inventorydetailuitype: string;
    shipmentbasecurrency: number;
    shipmentbillingstatus: string;
    shipmentcreateddate: Date;
    shipmentmemo: string;
    shipmentnumber: string;
    shipmentstatus: string;
    templatestored: string;
    vesselnumber: string;
    items: Sublist<ItemSublist>;
    landedcost: Sublist<LandedCostSublist>;
    static recordType(): record.Type;
}
