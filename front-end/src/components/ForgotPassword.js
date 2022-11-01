import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import "./Login.css"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <div className="app">
      <div className="login-topper-form"></div>
        <div className="login-form">
          <span className="title">Password Reset</span>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <div className="form">
          <form onSubmit={handleSubmit}>
            <span className="input-container" id="email">
              <label>Email :</label>
              <input type="email" ref={emailRef} required />
            </span>
            <button disabled={loading} className="submit" type="submit">
              Reset Password
            </button>
          </form>
          <div className="endingleft">
            <Link to="/login">Login</Link>
          </div>
      <div className="endingleft">
        Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
    </div>
  )
}
