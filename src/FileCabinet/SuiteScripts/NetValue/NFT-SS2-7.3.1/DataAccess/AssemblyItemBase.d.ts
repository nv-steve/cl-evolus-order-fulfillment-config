import * as record from 'N/record';
import { Sublist, SublistLine } from './Sublist';
import { Item } from './Item';
/**
 * the Members (member) sublist on AssemblyItem (assemblyitem) records
 */
export declare class MemberSublist extends SublistLine {
    effectivedate: Date;
    effectiverevision: number;
    memberdescr: string;
    item: number;
    linenumber: number;
    memberunit: string;
    quantity: number;
    taxschedule: number;
    weight: string;
}
/**
 * NetSuite Build/Assembly Item (assemblyitem) item type.
 */
export declare class AssemblyItemBase extends Item {
    static recordType(): record.Type;
    buildentireassembly: boolean;
    buildtime: number;
    isphantom: boolean;
    isspecialworkorderitem: boolean;
    member: Sublist<MemberSublist>;
}
