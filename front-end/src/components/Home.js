import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import LogoPic from "./pics/app_logo.png";
import Dots from "./pics/dots.png";
import Curve from "./pics/curve.png";
import InputDiary from './component_setting/input/input_diary';
import IconSlider from './component_setting/input/input_painlevel';
import "./home_styles.css";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import Calendars from "./Calendar"
import { Button, Slider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { SettingOutlined, HomeOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import { auth } from '../firebase'

function Home() {
  // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [painLevel, setPainLevel] = useState(0);
    const [bloodLevel, setBloodLevel] = useState(1);
    const diaryRef = useRef();

// calen
const { TextArea } = Input;


const submitDiary = ()=> {
    console.log(`Pain Level: ${painLevel}`);
    console.log(`Blood Level: ${bloodLevel}`);
    console.log(`Diary: ${diaryRef.current.value}`);
}


return (
    <div className="home">
        <Calendars className="component-calendar"/>
        <div className="home-form">
            <div className="home-title">PAIN LEVEL</div>
                <div className="pain-level-container">
                    <Slider onChange={setPainLevel} value={painLevel}></Slider>
                </div>
            <div className="home-title">BLOOD LEVEL</div>
                <div className="blood-level-container">
                    <button id="1" className="small-blood-level-block" value={1} onClick={(e)=> {
                        console.log(e.target.value);
                        setBloodLevel(e.target.value);
                    }}>
                    </button>
                    <button id="2" className="small-blood-level-block" value={2} onClick={(e)=> {
                        console.log(e.target.value);
                        setBloodLevel(e.target.value);
                    }}>
                    </button>
                    <button id="3" className="small-blood-level-block" value={3} onClick={(e)=> {
                        console.log(e.target.value);
                        setBloodLevel(e.target.value);
                    }}>
                    </button>
                </div>
            <div className="home-title">DIARY</div>
                <input rows={10} placeholder="What do you feel today?" maxLength={1000} className='diary-container' ref={diaryRef} />
                 
            <br></br>
            <Button type="primary" onClick={submitDiary} >Save</Button>
        </div>
        <span><Button className='route_home' type="primary" variant="link" onClick={()=>{window.location.href = "/"}} style={{ background: "#b8bedd"}}><p className='home_p' ><HomeOutlined className='icon_home'/>Setting</p></Button></span>

        <span><Button className='logout' type="primary" variant="link" onClick={() => {auth.signOut(); window.location.href = "./login"}} style={{ background: "#b8bedd"}}><p className='logout_p' ><LogoutOutlined className='icon_logout'/>Logout</p></Button></span>

    </div>
);
}

export default Home;