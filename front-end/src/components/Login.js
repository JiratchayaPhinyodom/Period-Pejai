import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./Login.css"
import InputPassword from "./component_setting/input/input_password"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <div className="app">
      <div className="login-topper-form"></div>
      <div className="login-form">
          <span className="title">Log In</span>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="form">
            <form onSubmit={handleSubmit}>
              <span className = "input-container" id="email">
                <label>Email :</label>
                <input type="email" ref={emailRef} required />
              </span>
              <span className = "input-container" id="password">
                <label>Password :</label>
                <InputPassword type="password" ref={passwordRef} required />
              </span>
              <div className="button-container">
              <button disabled={loading} type="submit" className="submit">
                Log In
              </button>
              </div>
            </form>
          </div>
          <div className="endingleft">
            <Link to="/forgot-password" >Forgot Password?</Link>
          </div>
      <div className="endingleft">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  </div>
  )
}
