import React, { useEffect, Fragment } from 'react';
import { fetchDoc } from '../helpers';
import { useAppState } from '../app-state';
import { Navbar } from './layout/Navbar';
import { Sidebar } from './layout/Sidebar';
import { Tasks } from './Tasks';
import { css, jsx } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
                <Navbar />
                <main>
                    <Sidebar />
                    <Switch>
                        <Route path='/today'>
                            <div>about</div>
                        </Route>
                        <Route path='/next7days'>
                            <div>next 7 days</div>
                        </Route>
                        <Route path='/'>
                            <Tasks />
                        </Route>
                    </Switch>
                </main>
            </Router>
        </Fragment>
    ) : null;
}
