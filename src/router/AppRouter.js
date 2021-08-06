import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { login } from '../components/auth/login'
import { CalndarScreen } from '../components/calendar/CalndarScreen'

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={CalndarScreen}/>
                    <Route exact path="/login" component={login}/>
                    <Redirect to="/login" />
                </Switch>
            </div>
        </Router>
    )
}
