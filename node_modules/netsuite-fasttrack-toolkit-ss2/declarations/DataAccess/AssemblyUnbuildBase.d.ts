import * as record from 'N/record';
import { NetsuiteRecord } from './Record';
import { Sublist, SublistLine } from './Sublist';
import { InventoryDetailBase } from './InventoryDetailBase';
/**
 * Components sublist
 */
export declare class ComponentSublist extends SublistLine {
    /**
     * Bin Item
     */
    binitem: boolean;
    /**
     * Component
     */
    compitemname: string;
    /**
     * Inventory Detail subrecord
     */
    componentinventorydetail: InventoryDetailBase;
    /**
     * Inventory Detail Available
     */
    componentinventorydetailavail: boolean;
    /**
     * Inventory Detail Required
     */
    componentinventorydetailreq: boolean;
    /**
     * Is Non Inventory
     */
    isnoninventory: boolean;
    /**
     * Is Numbered
     */
    isnumbered: boolean;
    /**
     * Is Serial
     */
    isserial: boolean;
    /**
     * Component
     */
    item: string;
    /**
     * Item Cost
     */
    itemcost: number;
    /**
     * Line Number
     */
    linenumber: number;
    /**
     * Location Uses Bins
     */
    locationusesbins: boolean;
    /**
     * Quantity
     */
    quantity: number;
    /**
     * Quantity On Hand
     */
    quantityonhand: number;
    /**
     * Unit Cost
     */
    unitcost: number;
}
/**
 * Assembly Unbuild record
 */
export declare class AssemblyUnbuildBase extends NetsuiteRecord {
    /**
     * Record type
     */
    static recordType(): record.Type;
    /**
     * Bill of Materials
     */
    billofmaterials: number;
    /**
     * Bill of Materials Revision
     */
    billofmaterialsrevision: number;
    /**
     * Quantity Built
     */
    built: number;
    /**
     * Class
     */
    class: number;
    /**
     * Created Date
     */
    createddate: Date;
    /**
     * Custom Form
     */
    customform: number;
    /**
     * Department
     */
    department: number;
    /**
     * Has Lines
     */
    haslines: boolean;
    /**
     * Inventory Detail Available
     */
    inventorydetailavail: boolean;
    /**
     * Inventory Detail Required
     */
    inventorydetailreq: boolean;
    /**
     *  Inventory Detail
     */
    inventorydetail: InventoryDetailBase;
    /**
     * Assembly
     */
    item: number;
    /**
     * Last Modified Date
     */
    lastmodifieddate: Date;
    /**
     * Location
     */
    location: number;
    /**
     * Location Uses Bins
     */
    locationusesbins: boolean;
    /**
     * Memo
     */
    memo: string;
    /**
     *  Posting Period
     */
    postingperiod: number;
    /**
     * Quantity to Unbuild
     */
    quantity: number;
    /**
     *  Revision
     */
    revision: number;
    /**
     * Revision Memo
     */
    revisionmemo: string;
    /**
     * Subsidiary
     */
    subsidiary: number;
    /**
     * Projected Value
     */
    total: number;
    /**
     * Date
     */
    trandate: Date;
    /**
     * Reference #
     */
    tranid: string;
    /**
     * Units
     */
    units: number;
    /**
     * Components
     */
    component: Sublist<ComponentSublist>;
}
