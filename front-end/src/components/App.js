import { useState, useEffect } from 'react';
import firebase from "../firebase"
import React from "react"
import "./App.css";
// import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard";
import Login from "./Login";
import Home from "./Home";
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRouter from "./PrivateRouter";
import { useAuth } from '../contexts/AuthContext';
import MainRouter from './Router';


const MainApp  = ()=> {
  const {currentUser} = useAuth();
  if (currentUser === null){
    console.log("Execute null")
    return <Login/>
  }
  else{
    console.log("Main Router");
    return <MainRouter/>
  };
}

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     setUser(user);
  //   })
  // }, [])

  // console.log(user);

  return (
    <div className="app">
      {/* {user ? <Dashboard user={user} /> : <Login />} */}
      <AuthProvider>
        <MainApp/>
      </AuthProvider>
    </div>
  );
}

export default App;