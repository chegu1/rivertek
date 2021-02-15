import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from './auth/SignUp'
import UsersListTable from './components/UsersListTable'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/allusers' component={UsersListTable} />
                <Route path="/signup" component={SignUp} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;