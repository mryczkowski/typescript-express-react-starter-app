import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import styles from './App.module.css';
import RouteChangeListener from './Util/RouteChangeListener';
import HomePage from './HomePage/HomePage';
import SignUpPage from './SignUpPage/SignUpPage';
import LoginPage from './LoginPage/LoginPage';
import AdminPage from './AdminPage/AdminPage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className={styles.app}>
                    <RouteChangeListener />

                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/sign-up" exact component={SignUpPage} />
                        <Route path="/login" exact component={LoginPage} />
                        <Route path="/admin" exact component={AdminPage} />

                        <Redirect from='*' to='/' />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
