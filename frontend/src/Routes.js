import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from './App'
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import AdminRoute from './components/AdminRoute';
import UsersListTable from './components/UsersListTable'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <AdminRoute path='/allusers' component={UsersListTable} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/" component={App} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;