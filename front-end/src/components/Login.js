import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./Login.css"
import Dots from "./pics/dots.png";
import LogoPic from "./pics/app_logo.png";
import InputPassword from "./component_setting/input/input_password"

//sign in with google
import { signInWithGoogle } from "../firebase"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  // const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   try {
  //     setError("")
  //     setLoading(true)
  //     await login(emailRef.current.value, passwordRef.current.value)
  //     history.push("/")
  //   } catch {
  //     setError("Failed to log in")
  //   }

  //   setLoading(false)
  // }

  return (
    <div className="login">
      <div className="login-topper-form"></div>
        <div className="login-form">
        {/* <a href="http://localhost:3000/login">
            <img src={LogoPic} className="App-logo" height = "350px"/>
        </a> */}
          <span className="login-title">LOGIN</span>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* <div className="form">
            <form onSubmit={handleSubmit}>
              <span className = "login-input-container" id="email">
                <label>E-MAIL:</label>
                <input type="email" ref={emailRef} required />
              </span>
              <span className = "login-input-container" id="password">
                <label>PASSWORD:</label>
                <input type="password" ref={passwordRef} required />
              </span>
              <div className="login-button-container">
              <button disabled={loading} type="submit" className="login-submit">
                LOGIN
              </button>
              </div>
            </form>
          </div>
          <div className="ending">
            <Link to="/forgot-password" >FORGET PASSWORD?</Link>
          </div>
      <div className="ending">
        <Link to="/signup">SIGN UP</Link>
      </div> */}
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  </div>
  )
}