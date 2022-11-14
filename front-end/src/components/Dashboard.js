import React, { useState, useEffect} from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import 'antd/dist/antd.css';
import './Dashboard.css';
import { Button } from 'antd';
import Profile from './component_setting/profile/profile'
import { SettingOutlined, HomeOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import ToggleSwitch from './component_setting/toggle/toggle_period'
import Input_birth from './component_setting/input/input_birth';
import Input_period from './component_setting/input/input_period'
import Input_cycle from './component_setting/input/input_cycle';
import Input_phase from './component_setting/input/input_phase';
import Swal from 'sweetalert2'
import LineLink from "./pics/line_button.png";
import { InputNumber, Space } from 'antd';
import Input from "antd/lib/input/Input";

function saveConfirm(){
  Swal.fire({
    title: 'Your information has been saved!',
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff',
    backdrop: `
      rgba(0,0,123,0.4)
    `
  })
}

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout, login} = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [setting, userSetting] = useState({
    birth_year: "",
    period_length: "", 
    cycle_length: "", 
    luteal_length: "", 
  });
  console.log(setting);

  // useEffect(async () => {
  //   try {
  //     const res = await fetch('http://127.0.0.1:8000/api/data')
  //     const setting_data = await res.json()
  //     userSetting(setting_data)
  //   } catch (error) {
  //       console.log(error)
  //     }
  // }, [])
  // console.log(setting);
  // get ค่ามาแสดงตรง setting ยังไม่มั่นใจว่าจะเช็ค user ยังไง

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

function handleSubmit(e) {
  e.preventDefault();
    let url = "http://127.0.0.1:8000/api/setting";
    fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(setting),
  })
  .then((response) => {
    // fetchPeriod();
    userSetting({birth_year: "",
    period_length: "", 
    cycle_length: "", 
    luteal_length: "", })
  })
  .catch((err) => console.log(err));
}

  return (
    <div className='App'>
    <div className='left-side'>
    <Profile />
    <span className='setting'>
    <p className='setting_p'><SettingOutlined className='icon_setting'/>Setting</p>
    </span>
    <span><Button className='route_home' type="primary" variant="link" onClick={handleHome} style={{ background: "#b8bedd"}}><p className='home_p' ><HomeOutlined className='icon_home'/>Home</p></Button></span>
    <p className='reminder'>Reminders</p>
    <ToggleSwitch label="Period" />
    <ToggleSwitch label="Ovaluation"/>
    <a href="https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=3i37SxxITCH1t4ngUNAPuz&redirect_uri=http://127.0.0.1:8000/api/setting&scope=notify&state=abcdef123456">
            <img src={LineLink} className="line-logo" height = "50px"/>
    </a>
    <Button className="update" type="primary" variant="link" onClick={handleUpdateProfile} style={{ background: "#b8bedd"}}><p className="update_p"><UserOutlined className='icon_user'/>Update Profile </p></Button>
    <span><Button className='logout' type="primary" variant="link" onClick={handleLogout} style={{ background: "#b8bedd"}}><p className='logout_p' ><LogoutOutlined className='icon_logout'/>Logout</p></Button></span>
  </div>
  <form onSubmit={handleSubmit}>
  <div className='bc-input'>
    <div className='input'>
      {/* <span className='box-year'><p className='year'>YEAR OF BIRTH </p><span className='mar'><Input_birth/></span></span>
      <span className='box-period'><p className='period-length'>PERIOD LENGTH</p><span className='mar'><Input_period /> DAYS</span></span>
      <span className='box-cycle'><p className='cycle-length'>CYCLE LENGTH</p><span className='mar'><Input_cycle /> DAYS</span></span>
      <span className='box-phase'><p className='phase-length'>LUTEAL PHASE LENGTH </p><span className='mar'><Input_phase /> DAYS</span></span> */}
      <span className='box-year'>
        <p className='year'>YEAR OF BIRTH </p>
      </span>
          <input type="number" value={setting.birth_year} className="input-border" placeholder="2002" onChange={(e) => userSetting({ ...setting, birth_year: e.target.value })}/>
      <span className='box-period'>
        <p className='year'>PERIOD LENGTH </p>
      </span>
          <input type="number" value={setting.period_length} className="input-border" placeholder="7" onChange={(e) => userSetting({ ...setting, period_length: e.target.value })}/>
      <span className='box-cycle'>
        <p className='year'>CYCLE LENGTH </p>
      </span>
          <input type="number" value={setting.cycle_length} className="input-border" placeholder="28" onChange={(e) => userSetting({ ...setting, cycle_length: e.target.value })}/>
      <span className='box-phase'>
        <p className='year'>LUTHEAL PHASE <br></br>LENGTH </p>
      </span>
          <input type="number" value={setting.luteal_length} className="input-border" placeholder="14" onChange={(e) => userSetting({ ...setting, luteal_length: e.target.value })}/>
      {/* <button disabled={loading} type="submit" className="setting-submit" onClick={saveConfirm}>
          Save
      </button> */}
      <button id="submit" className="setting-submit" type="submit" onClick={saveConfirm}> Save </button>
    </div>
  </div>
  </form>
</div>
  )
}
