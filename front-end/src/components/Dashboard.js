import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import 'antd/dist/antd.css';
import './Dashboard.css';
import { Button } from 'antd';
import { SettingOutlined, HomeOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import ToggleSwitch from './component_setting/toggle/toggle_period'
import Input_birth from './component_setting/input/input_birth';
import Input_period from './component_setting/input/input_period'
import Input_cycle from './component_setting/input/input_cycle';
import Input_phase from './component_setting/input/input_phase';
import Swal from 'sweetalert2';
import LineLink from "./pics/line_button.png";

import { auth } from '../firebase'

function saveConfirm(){
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Saved!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}


const Dashboard= () =>{
  const [error, setError] = useState("")
  const { currentUser} = useAuth()
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  

  return (
    <div className='App'>
    <div className='left-side'>
    <h1 className="h1-setting">WELCOME TO PERIOD-PEJAI</h1>
    <img src={currentUser.photoURL} alt="" className="profile-user"/>
    <h2 className="name-user">{currentUser.displayName.toUpperCase()}</h2>
    <span className='setting'>
      <SettingOutlined className='icon_setting'/><p className='setting_p'>Setting</p>
    </span>
    <span>
      <Button className='route_home' type="primary" variant="link" onClick={()=>{window.location.href = "/home"}} style={{ background: "#b8bedd"}}>
        <HomeOutlined className='icon_home'/>
        <p className='home_p' >Home</p>
      </Button>
    </span>
    <p className='reminder'>REMINDER</p>
      <ToggleSwitch label="Period"/>
      <ToggleSwitch label="Ovaluation"/>
    <a href="https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=3i37SxxITCH1t4ngUNAPuz&redirect_uri=http://127.0.0.1:8000/api/setting&scope=notify&state=abcdef123456">
            <img src={LineLink} className="line-logo" height = "50px"/>
    </a>
    <span>
      <Button className='logout' type="primary" variant="link" onClick={() => {auth.signOut(); window.location.href = "./login"}} style={{ background: "#b8bedd"}}>
        <LogoutOutlined className='icon_logout'/>
          <p className='logout_p' >Logout</p>
        </Button>
    </span>
  </div>
  <div className='bc-input'>
    <div className='input'>
      <span className='box-year'>
        <p className='year'>YEAR OF BIRTH </p>
        <span className='mar'><Input_birth /></span>
      </span>
      <span className='box-period'>
        <p className='period-length'>PERIOD LENGTH</p>
        <span className='mar'><Input_period /> DAYS</span>
      </span>
      <span className='box-cycle'>
        <p className='cycle-length'>CYCLE LENGTH</p>
        <span className='mar'><Input_cycle /> DAYS</span>
      </span>
      <span className='box-phase'>
        <p className='phase-length'>LUTEAL PHASE LENGTH </p>
        <span className='mar'><Input_phase /> DAYS</span>
      </span>
      <button disabled={loading} type="submit" className="setting-submit" onClick={saveConfirm}>
          Save
      </button>
      </div>
  </div>
</div>
  )
}

export default Dashboard;
