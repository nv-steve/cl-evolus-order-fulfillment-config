/**
 * Represents Sublists and their field access. Sublists use a different api than body fields in NS.
 * Note that in NFT-SS1.0 we collapsed the sublist and body descriptors into a common codebase. Decided not to do
 * that here (yet) in interest of code clarity. Also the fact that it's only two copies (usually use the rule of
 * three's for DRY).
 */
import * as record from 'N/record';
import * as format from 'N/format';
import { NetsuiteCurrentRecord } from './Record';
export type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
/**
 * decorators for sublist fields. Adorn your class properties with these to bind your class property name with
 * the specific behavior for the type of field it represents in NetSuite.
 */
export declare namespace SublistFieldType {
    var checkbox: typeof defaultSublistDescriptor;
    var currency: typeof defaultSublistDescriptor;
    var date: typeof defaultSublistDescriptor;
    var datetime: typeof defaultSublistDescriptor;
    var email: typeof defaultSublistDescriptor;
    var freeformtext: typeof defaultSublistDescriptor;
    var decimalnumber: typeof defaultSublistDescriptor;
    var float: typeof defaultSublistDescriptor;
    var hyperlink: typeof defaultSublistDescriptor;
    var image: typeof defaultSublistDescriptor;
    var inlinehtml: typeof defaultSublistDescriptor;
    var integernumber: typeof defaultSublistDescriptor;
    var longtext: typeof defaultSublistDescriptor;
    var multiselect: typeof defaultSublistDescriptor;
    var namevaluelist: typeof defaultSublistDescriptor;
    var percent: typeof defaultSublistDescriptor;
    const rate: typeof defaultSublistDescriptor;
    var select: typeof defaultSublistDescriptor;
    var textarea: typeof defaultSublistDescriptor;
    const subrecord: typeof subrecordDescriptor;
}
/**
 * Generic property descriptor with basic default algorithm that exposes the field value directly with no
 * other processing. If the target field name ends with 'Text' it uses NetSuite `getText()/setText()` otherwise (default)
 * uses `getValue()/setValue()`
 * Apply this decorator (or its aliases) to properties on SublistLine subtypes
 * @returns an object property descriptor to be used
 * with Object.defineProperty
 */
declare function defaultSublistDescriptor<T extends SublistLine>(target: T, propertyKey: string): any;
/**
 * Generic property descriptor with algorithm for values that need to go through the NS format module
 * note: does not take into account timezone
 * @param {string} formatType the NS field type (e.g. 'date')
 * @param target
 * @param propertyKey
 * @returns  an object property descriptor to be used
 * with decorators
 */
export declare function formattedSublistDescriptor(formatType: format.Type, target: any, propertyKey: string): any;
/**
 * Decorator for sublist *subrecord* fields with the subrecord shape represented by T (which
 * defines the properties you want on the subrecord)
 * @param ctor Constructor for the subrecord class you want (e.g. `AddressBase`, `InventoryDetail`).
 */
export declare function subrecordDescriptor<T extends NetsuiteCurrentRecord>(ctor: new (rec: record.Record) => T): (target: any, propertyKey: string) => any;
/**
 * creates a sublist whose lines are of type T
 */
export declare class Sublist<out T extends SublistLine> {
    readonly sublistLineType: {
        new (sublistId: string, nsrec: record.Record, line: number): T;
    };
    sublistId: string;
    nsrecord: record.Record;
    /**
     * Constructs a new array-like representation of a NS sublist.
     * @param sublistLineType the type (should be a class extending `SublistLine`) to represent individual rows
     * of this sublist
     * @param rec the NS native`record.Record` instance to manipulate
     * @param sublistId name of the sublist we're representing
     */
    constructor(sublistLineType: {
        new (sublistId: string, nsrec: record.Record, line: number): T;
    }, rec: record.Record, sublistId: string);
    private _useDynamicModeAPI;
    [i: number]: T;
    /**
     * If true **and** the underlying netsuite record is in dynamic mode, uses the dynamic APIs to manipulate the sublist (e.g. `getCurrentSublistValue()`)
     * If false uses 'standard mode' (e.g. `getSublistValue()`)
     * Defaults to true if the record is in dynamic mode. Set this to false prior to manipulating the sublist in order
     * to force standard mode API usage even if the record is in 'dynamic mode'
     */
    get useDynamicModeAPI(): boolean;
    set useDynamicModeAPI(value: boolean);
    /**
     * array-like length property (linecount)
     * @returns {number} number of lines in this list
     */
    get length(): number;
    /**
     * adds a new line to this sublist at the given line number.
     * @param ignoreRecalc set true to avoid line recalc
     * @param insertAt optionally set line # insertion point - defaults to insert at the end of the sublist. If
     * in dynamic mode this parameter is ignored (dynamic mode uses selectNewLine()). The insertion point
     * should be <= length of the list
     */
    addLine(ignoreRecalc?: boolean, insertAt?: number): T;
    /**
     * Removes all existing lines of this sublist, leaving effectively an empty array
     * @param ignoreRecalc passed through to nsrecord.removeLine (ignores firing recalc event as each line is removed )
     */
    removeAllLines(ignoreRecalc?: boolean): this;
    /**
     * commits the currently selected line on this sublist. When adding new lines in standard mode
     * you don't need to call this method
     */
    commitLine(): void;
    /**
     * Selects the given line on this sublist
     * @param line line number
     */
    selectLine(line: number): void;
    /**
     * removes a line at the given index. Note this causes the array to rebuild.
     * @param line
     * @param ignoreRecalc
     */
    removeLine(line: number, ignoreRecalc?: boolean): void;
    /**
     * Gets the NetSuite metadata for the given sublist field. Useful when you want to do things like disable
     * a sublist field or other operations on the field itself (rather than the field value/text)
     * Note: this uses the first sublist line (0) when retrieving field data
     * @param field name of the desired sublist field
     */
    getField(field: keyof T): record.Field;
    /**
     * upserts the indexed props (array-like structure) This is called once at construction, but also
     * as needed when a user dynamically works with sublist rows.
     */
    protected rebuildArray(): void;
    /**
     * Defines a descriptor for nsrecord so as to prevent it from being enumerable. Conceptually only the
     * field properties defined on derived classes should be seen when enumerating
     * @param value
     */
    private makeRecordProp;
    toJSON(): any[];
}
/**
 * Base class for a sublist line. Encapsulates - 1. which sublist are we working with, 2. on which record
 * 3. which line on the sublist does this instance represent
 *
 * You extend from this class (or a pre-existing subclass) to define the fields to surface on the NetSuite sublist.
 * Class property names should be the netsuite field internal id. By default these fields surface the `value` of the field
 * To `get/setText()` instead, append the field name with `Text`.
 *
 * @example Surfaces the `price` field both as _value_ (numeric internal id) and _text_
 *       class SalesOrderItemSublist extends SublistLine {
 *         @SublistFieldType.select
 *         price:number
 *
 *         @SublistFieldType.freeformtext
 *         priceText:string
 *       }
 */
export declare abstract class SublistLine {
    sublistId: string;
    _line: number;
    nsrecord: record.Record;
    /**
     * If set to true, the field change and the secondary event is ignored.
     */
    ignoreFieldChange: boolean;
    /**
     * If true, *and* in dynamic mode, this parameter can be used to alleviate a timing situation that may occur in some
     * browsers when fields are sourced. For some browsers, some APIs are triggered without waiting for the field
     * sourcing to complete. For example, if forceSyncSourcing is set to false when adding sublist lines, the lines
     * aren't committed as expected. Setting the parameter to true, forces synchronous sourcing.
     */
    forceSyncSourcing: boolean;
    /**
     * If true, uses dynamic mode API calls to access sublist line field values.
     * If false, uses standard mode
     * The default behavior is to use dynamic mode if the record is in dynamic mode. You can override this
     * (force using 'standard mode' APIs even with a dynamic record) by setting this value `false` prior to
     * your code that manipulates the sublist line.
     */
    useDynamicModeAPI: boolean;
    /**
     * Note that the sublistId and _line are used by the Sublist decorators to actually implement functionality, even
     * though they are not referenced directly in this class. We mark them as not-enumerable because they are an implementation
     * detail and need not be exposed to the typical consumer
     * @param {string} sublistId netsuite internal id (string name) of the sublist
     * @param {Record} rec netsuite record on which the sublist exists
     * @param {number} _line the line number needed in decorator calls to underlying sublist. That's also why this is
     * public - so that the decorators have access to it.
     */
    constructor(sublistId: string, rec: record.Record, _line: number);
    /**
     * Gets the subrecord for the given field name, handling both dynamic and standard mode.
     *
     * Normally you don't call this method directly. Instead, simply define a property
     * on your sublist class matching the field name for the subrecord and decorate it as a subrecord.
     * e.g.
     * ```
     * @FieldType.subrecord(AddressBase)
     * billingaddress: AddressBase
     * ```
     * @param fieldId the field that points to the subrecord
     */
    getSubRecord(fieldId: string): record.Record;
    toJSON(): any;
    /**
     * Defines a descriptor for nsrecord so as to prevent it from being enumerable. Conceptually only the
     * field properties defined on derived classes should be seen when enumerating
     * @param value
     */
    protected makeRecordProp(value: any): void;
}
export {};
