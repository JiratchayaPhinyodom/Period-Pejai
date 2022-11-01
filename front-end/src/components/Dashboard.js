import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import 'antd/dist/antd.css';
import './Dashboard.css';
import { Button } from 'antd';
import Profile from './component_setting/profile/profile'
import { SettingOutlined, HomeOutlined, LogoutOutlined} from '@ant-design/icons';
import ToggleSwitch from './component_setting/toggle/toggle_period'
import Input_birth from './component_setting/input/input_birth';
import Input_period from './component_setting/input/input_period'
import Input_cycle from './component_setting/input/input_cycle';
import Input_phase from './component_setting/input/input_phase';

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout, login} = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
}
async function handleHome() {
  setError("")

  try {
    history.push("/home")
  } catch {
    setError("Failed to go to Home page")
  }
}

async function handleUpdateProfile() {
  setError("")

  try {
    history.push("/update-profile")
  } catch {
    setError("Failed to log out")
  }
}
  

  return (
    <div className='App'>
    <div className='left-side'>
    <Profile />
    <span className='setting'>
    <p className='setting_p'><SettingOutlined className='icon_setting'/>Setting</p>
    </span>
    <span><Button className='route_home' variant="link" onClick={handleHome}><p className='home_p' ><HomeOutlined className='icon_home'/>Home</p></Button></span>
    <p className='reminder'>Reminders</p>
    <ToggleSwitch label="Period" />
    <ToggleSwitch label="Ovaluation"/>
    <Button className="update" variant="link" onClick={handleUpdateProfile}><p className="update_p"> Update Profile </p></Button>
    <span><Button className='logout' variant="link" onClick={handleLogout}><p className='logout_p' ><LogoutOutlined className='icon_logout'/>Logout</p></Button></span>
  </div>
  <div className='bc-input'>
    <div className='input'>
      <span className='box-year'><p className='year'>YEAR OF BIRTH </p><span className='mar'><Input_birth /></span></span>
      <span className='box-period'><p className='period-length'>PERIOD LENGTH</p><span className='mar'><Input_period /> DAYS</span></span>
      <span className='box-cycle'><p className='cycle-length'>CYCLE LENGTH</p><span className='mar'><Input_cycle /> DAYS</span></span>
      <span className='box-phase'><p className='phase-length'>LUTEAL PHASE LENGTH </p><span className='mar'><Input_phase /> DAYS</span></span>
      </div>
  </div>
</div>
  )
}
