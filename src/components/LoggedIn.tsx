import React, { useEffect, Fragment } from 'react';
import { fetchDoc } from '../helpers';
import { useAppState } from '../app-state';
import { Navbar } from './layout/Navbar';
import { Sidebar } from './layout/Sidebar';
import { Tasks } from './Tasks';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { DialogProvider } from '../context/DialogContext';

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
            <Router>
                <DialogProvider>
                    <Navbar />
                    <main>
                        <Sidebar />
                        <Switch>
                            <Route exact path='/:id'>
                                <Tasks />
                            </Route>
                            <Redirect from='/' to='/inbox' />
                        </Switch>
                    </main>
                </DialogProvider>
            </Router>
        </Fragment>
    ) : null;
}
