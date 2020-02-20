import { useState, useEffect } from 'react';
import { db } from '../db';
import moment from 'moment';
import { collatedTasksExist } from '../helpers';

export const useTasks = (selectedProject: string) => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
};


const useFirebaseAuthentication = (firebase: { auth: { onAuthStateChanged: (arg0: (authUser: any) => void) => any; }; }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unlisten = firebase.auth.onAuthStateChanged(
            authUser => {
                authUser
                    ? setAuthUser(authUser)
                    : setAuthUser(null);
            },
        );
        return () => {
            unlisten();
        }
    });

    return authUser
}

export default useFirebaseAuthentication;