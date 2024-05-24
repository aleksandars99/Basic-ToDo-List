export class Task {
    taskId: number;
    title: string;
    description: string;
    listPlace: string;
    dueDate: Date;
}
export enum taskEnum {
    Personal,
    Work,
    List1
}
export class daysInYear {
    id: number;
    value: string;
}
export class Calendars {
    id: number;
    date: string;
}