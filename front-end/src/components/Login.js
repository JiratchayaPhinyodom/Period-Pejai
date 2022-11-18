import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import "./Login.css"
import Dots from "./pics/dots.png";
import LogoPic from "./pics/app_logo.png";

//sign in with google
import { signInWithGoogle } from "../firebase"
import { Prev } from "react-bootstrap/esm/PageItem";

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
          <img src={LogoPic} className="App-logo" height = "350px"/>
            <h1 className="head-login">Welcome to period-pejai</h1>
              <p1 className="paragraph-login">
              We'll assist you in overcoming
              the difficulty of forgetting your menstrual cycle.
              And foretell your period for the next month,
              As well as assist ladies who wish to plan for the birth of children.</p1>
      <button onClick={async ()=>{await signInWithGoogle(); window.location.href = "/"}} className="login-google">Login in with google</button>
    </div>
  </div>
  )
}