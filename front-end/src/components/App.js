import React from "react"
import "./App.css";
import Login from "./Login";
import { AuthProvider } from '../contexts/AuthContext';
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
    console.log(currentUser)
    console.log(currentUser.uid)
    return <MainRouter/>
  };
}

function App() {

  return (
    <div className="app">
      <AuthProvider>
        <MainApp/>
      </AuthProvider>
    </div>
  );
}

export default App;