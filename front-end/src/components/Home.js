import React, { useState, useRef, useEffect, useCallback } from "react";
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
 const uidRef = useRef();
 const [startDate, setStartDate] = useState();
 const [endDate, setEndDate] = useState();
 const [dataDate, setDataDate] = useState();
 const [home, userHome] = useState({
     diary_text: "",
     blood_level: "",
     pain_level: "",
     start_date: "",
     end_date: "",
     uid: "",
     date: "",
     });

// calen
const { TextArea } = Input;

const DateToString = (date) => {
    let day = date.getDate()
    let month = date.getMonth() + 1
    if(date.getMonth() < 10) {
      month = '0' + month
    }
    if(date.getDate() < 10) {
      day = '0' + day
    }
    return date.getFullYear() + '-' + month + '-' + day
  }

const submitDiary = ()=> {
    console.log(`Pain Level: ${painLevel}`);
    console.log(`Blood Level: ${bloodLevel}`);
    console.log(`Diary: ${diaryRef.current.value}`);
    console.log(`Date: ${DateToString(date)}`)
}

const [date, setDate] = useState(new Date());
const [rangeDate, setRangeDate] = useState([])

useEffect(() => {
    // call api ---> get data
        // setRangeDate(data)
},[])
    
const setR = useCallback((data) => {
    console.log("date: ",data)
    setRangeDate(data)

    // use data ---> call api

},[rangeDate])

function handleSubmit(e) {
    // userHome({ diary_text: diaryRef.current.value,
    // blood_level: bloodLevel,
    // pain_level: painLevel,})
    e.preventDefault();
    let url = "http://127.0.0.1:8000/api/diary";
    fetch(url, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ diary_text: diaryRef.current.value,
        blood_level: bloodLevel,
        pain_level: painLevel,
        start_date: "",
        end_date: "",
        uid: "",
        date: "",}),
    })
    .catch((err) => console.log(err));
}

const [activeBtnBlood1, setactiveBtnBlood1] = useState(true)
const [activeBtnBlood2, setactiveBtnBlood2] = useState(true)
const [activeBtnBlood3, setactiveBtnBlood3] = useState(true)

return (
    <div className="home">
        <Calendars className="component-calendar" date={date} setDate={setDate} rangeDate={rangeDate } setRangeDate={setR } />
        {/* <button type="button" onClick={(ev) => {console.log("button",rangeDate)}} >rangeDate</button> */}
        {/* <button type="button" onClick={() => setClick(click+1)} >setClick</button> */}
        <div className="home-form">
            <div className="home-title">PAIN LEVEL</div>
                <div className="pain-level-container">
                    <Slider onChange={setPainLevel} value={painLevel}></Slider>
                </div>
            <div className="home-title">BLOOD LEVEL</div>
                <div className="blood-level-container">
                    {activeBtnBlood1 ? <button id="1" className="small-blood-level-block" value={1} onClick={(e)=> {
                        console.log(e.target.value);
                        setBloodLevel(e.target.value);
                        setactiveBtnBlood1(false);
                        setactiveBtnBlood2(true);
                        setactiveBtnBlood3(true)
                    }}>
                    </button> : <button id="1" className="small-blood-level-block" style = {{background:"#ffb5a7"}}value={1} onClick={(e)=> {
                        setactiveBtnBlood1(true);
                                
                    }}></button>}
                    {activeBtnBlood2 ? <button id="2" className="small-blood-level-block" value={2} onClick={(e)=> {
                        console.log(e.target.value);
                        setBloodLevel(e.target.value);
                        setactiveBtnBlood2(false)
                        setactiveBtnBlood1(true)
                        setactiveBtnBlood3(true)
                    }}>
                    </button> : <button id="2" className="small-blood-level-block" style = {{background:"#ffb5a7"}} value={2} onClick={(e)=> {
                        setactiveBtnBlood2(true)
                    }}></button>}
                    {activeBtnBlood3 ? <button id="3" className="small-blood-level-block" value={3} onClick={(e)=> {
                        console.log(e.target.value);
                        setBloodLevel(e.target.value);
                        setactiveBtnBlood3(false)
                        setactiveBtnBlood2(true)
                        setactiveBtnBlood1(true)
                    }}>
                    </button> : <button id="3" className="small-blood-level-block" style = {{background:"#ffb5a7"}} value={3} onClick={(e)=> {
                        // console.log(e.target.value);
                        // setBloodLevel(e.target.value);
                        setactiveBtnBlood3(true)
                    }}></button>}
                </div>
            <div className="home-title">DIARY</div>
                <input rows={10} placeholder="What do you feel today?" maxLength={1000} className='diary-container' ref={diaryRef} />
            <br></br>
            <Button type="primary" onClick={handleSubmit} >Save</Button>
        </div>
        <span><Button className='route_home' type="primary" variant="link" onClick={()=>{window.location.href = "/"}} style={{ background: "#b8bedd"}}><p className='home_p' ><HomeOutlined className='icon_home'/>Setting</p></Button></span>

        <span><Button className='logout' type="primary" variant="link" onClick={() => {auth.signOut(); window.location.href = "./login"}} style={{ background: "#b8bedd"}}><p className='logout_p' ><LogoutOutlined className='icon_logout'/>Logout</p></Button></span>

    </div>
);
}

export default Home;