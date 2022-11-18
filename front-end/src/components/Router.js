import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Home";
import Dashboard from "./Dashboard";

const MainRouter = ()=> {
    return(
        <Router>
            <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Dashboard}/>   
            </Switch>
        </Router>
    );
}
export default MainRouter;