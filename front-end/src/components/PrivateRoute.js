import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"

export default function PrivateRoute() {

  return (
    <Router>
      <Switch>
        <Route path = "/login" component={Login}> </Route>
      </Switch>
    </Router>
  )
}
