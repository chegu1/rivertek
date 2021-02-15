import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from './auth/SignUp'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signup" component={SignUp} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;