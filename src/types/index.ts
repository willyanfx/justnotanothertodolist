export type Task = {
    value: string;
    state: string;
    red: boolean;
};

export interface AddTaskProps {
    name?: string;
    date?: string;
    uid: string;
    id?: any | string;
    task?: string | undefined;
    projectId: string;
    archived?: boolean;
}

export enum StandardProj {
    inbox = 'inbox',
    today = 'today',
    next7 = 'next7days'
}
export type Docs = {
    archived: boolean;
    id: string;
    projectId: string;
    task: string;
    uid: string;
};
export type signUpProp = {
    email: string;
    password: string;
    displayName: string;
    photoURL: string;
};
