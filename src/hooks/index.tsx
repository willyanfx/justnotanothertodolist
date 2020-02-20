import { useState, useEffect } from 'react';
import { db } from '../db';
import moment from 'moment';
import { collatedTasksExist } from '../helpers';

export const useTasks = (selectedProject: string) => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
};

type AuthFirebase = {
    auth: { onAuthStateChanged: (arg0: (authUser: any) => void) => any };
};

const useFirebaseAuthentication = (firebase: AuthFirebase) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unlisten = firebase.auth?.onAuthStateChanged(
            (authUser: any): void => {
                authUser ? setAuthUser(authUser) : setAuthUser(null);
            }
        );
        return () => {
            unlisten();
        };
    });

    return authUser;
};

export default useFirebaseAuthentication;
