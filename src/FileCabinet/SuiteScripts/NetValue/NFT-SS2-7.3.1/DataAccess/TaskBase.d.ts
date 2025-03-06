import { NetsuiteRecord } from './Record';
import * as record from 'N/record';
/**
 * Project Task Base class
 */
export declare class TaskBase extends NetsuiteRecord {
    /**
     * Private task
     */
    accesslevel: boolean;
    /**
     * Actual Time
     */
    actualtime: string;
    /**
     * Assigned To
     */
    assigned: number | string;
    /**
     * Company
     */
    company: number | string;
    /**
     * Contact
     */
    contact: number | string;
    /**
     * Due Date
     */
    duedate: Date;
    /**
     * Due Date
     */
    enddate: string;
    /**
     * End Time
     */
    endtime: string;
    /**
     * End Time Picker
     */
    endtimepicker: string;
    /**
     * Initial Time Budget
     */
    estimatedtime: string;
    /**
     * Current Time Budget
     */
    estimatedtimeoverride: string;
    /**
     * Group
     */
    group: string;
    /**
     * Message
     */
    message: string;
    /**
     * Milestone
     */
    milestone: number | string;
    /**
     * Created By
     */
    owner: string;
    /**
     * Parent Task
     */
    parent: number | string;
    /**
     * Percent Complete
     */
    percentcomplete: string;
    /**
     * Percent Time Complete
     */
    percenttimecomplete: string;
    /**
     * Priority
     */
    priority: number | string;
    /**
     * Reminder
     */
    reminderminutes: number | string;
    /**
     * Reminder Type
     */
    remindertype: number | string;
    /**
     * Notify Assignee by Email
     */
    sendemail: boolean;
    /**
     * Start Date
     */
    startdate: Date;
    /**
     * Start Time
     */
    starttime: string;
    /**
     * Start Time Picker
     */
    starttimepicker: number | string;
    /**
     * Status
     */
    status: number | string;
    /**
     * Support Case
     */
    supportcase: number | string;
    /**
     * Reserve Time
     */
    timedevent: boolean;
    /**
     * Time Remaining
     */
    timeremaining: string;
    /**
     * Timezone
     */
    timezone: string;
    /**
     * Title
     */
    title: string;
    /**
     * Transaction
     */
    transaction: number | string;
    /**
     * Record type
     */
    static recordType(): record.Type;
}
