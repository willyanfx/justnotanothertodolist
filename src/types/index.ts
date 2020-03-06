export type Task = {
    value: string;
    state: string;
    red: boolean;
};

export type AddTaskProps = {
    name?: string;
    date?: string;
    uid: string;
    id?: any | string;
    task?: string | undefined;
    projectId: string;
    archived?: boolean;
};

export enum StandardProj {
    inbox = 'INBOX',
    today = 'TODAY',
    next7 = 'NEXT_7DAYS'
}
