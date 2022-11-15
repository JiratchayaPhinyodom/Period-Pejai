import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import "./Login.css"
import Dots from "./pics/dots.png";
import LogoPic from "./pics/app_logo.png";

//sign in with google
import { signInWithGoogle } from "../firebase"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  return (
    <div className="login">
      <div className="login-topper-form"></div>
        <div className="login-form">
        <a href="http://localhost:3000/login">
            <img src={LogoPic} className="App-logo" height = "350px"/>
        </a>
          <span className="login-title">LOGIN</span>
          {error && <Alert variant="danger">{error}</Alert>}
      <button onClick={async ()=>{await signInWithGoogle(); window.location.href = "/"}}>Sign in with google</button>
    </div>
  </div>
  )
}