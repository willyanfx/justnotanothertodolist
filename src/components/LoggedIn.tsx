import React, { useEffect, Fragment } from 'react';
import { fetchDoc } from '../helpers';
import { useAppState } from '../app-state';
import { Navbar } from './layout/Navbar';
import { Sidebar } from './layout/Sidebar';
import { Tasks } from './Tasks';
import { Route, Router, DefaultRoute } from 'react-router-dom';

export default function LoggedIn() {
    const [{ auth, user }, dispatch] = useAppState();
    useEffect(() => {
        if (!user) {
            fetchDoc(`users/${auth.uid}`).then((user: string) => {
                // okay to dispatch even if unmounted, might as well
                // get it in the app state cache
                dispatch({ type: 'LOAD_USER', user });
            });
        }
    }, [user, auth.uid, dispatch]);

    return user ? (
        <Fragment>
            <Navbar />
            <main>
                <Sidebar />
                <Tasks />
            </main>
        </Fragment>
    ) : null;
}
