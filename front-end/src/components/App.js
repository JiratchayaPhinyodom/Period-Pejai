import { useState, useEffect } from 'react';

import Login from './Login';
import firebase from "../firebase"
import React from "react"
import Setting from "./Setting"

import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Home from "./Home"
import "./App.css";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  console.log(user);

  return (
    <div className="app">
      {user ? <Dashboard user={user} /> : <Login />}
      <Router>
           <AuthProvider>
             <Switch>
               <PrivateRoute exact path="/" component={Dashboard} />
               <PrivateRoute path="/update-profile" component={UpdateProfile} />
               <Route path="/signup" component={Signup} />
               <Route path="/login" component={Login} />
               <Route path="/forgot-password" component={ForgotPassword} />
               <Route path="/home" component={Home} />
             </Switch>
           </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

// import React from "react"
// import Signup from "./Signup"
// import { AuthProvider } from "../contexts/AuthContext"
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import Dashboard from "./Dashboard"
// import Login from "./Login"
// import PrivateRoute from "./PrivateRoute"
// import ForgotPassword from "./ForgotPassword"
// import UpdateProfile from "./UpdateProfile"
// import Home from "./Home"
// import "./App.css";

// function App() {
//   return (
//       <div className="app" >
//         <Router>
//           <AuthProvider>
//             <Switch>
//               <PrivateRoute exact path="/" component={Dashboard} />
//               <PrivateRoute path="/update-profile" component={UpdateProfile} />
//               <Route path="/signup" component={Signup} />
//               <Route path="/login" component={Login} />
//               <Route path="/forgot-password" component={ForgotPassword} />
//               <Route path="/home" component={Home} />
//             </Switch>
//           </AuthProvider>
//         </Router>
//       </div>
//   )
// }

// export default App
