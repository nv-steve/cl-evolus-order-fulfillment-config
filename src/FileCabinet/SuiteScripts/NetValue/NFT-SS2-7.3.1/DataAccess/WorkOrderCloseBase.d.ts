/**
 * NetSuite Work Order Close Record Type
 */
import { type Sublist, SublistLine } from './Sublist';
import { NetsuiteRecord } from './Record';
export declare class ComponentSublist extends SublistLine {
}
/**
 * NetSuite Work Order Close Record type
 */
export declare class WorkOrderCloseBase extends NetsuiteRecord {
    component: Sublist<ComponentSublist>;
}
