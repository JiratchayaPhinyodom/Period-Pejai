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
    console.log(`Date: ${date.toDateString()}`)
}

const [date, setDate] = useState(new Date());
const [rangeDate, setRangeDate] = useState([])

    useEffect(() => {
    // call api ---> get data
        // setRangeDate(data)
},[])
    
const setR = useCallback((data) => {
    console.log("rangeDate will set with data = ",data)
    setRangeDate(data)

    // use data ---> call api

},[rangeDate])

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
                    <button id="1" className="small-blood-level-block" value={1} onClick={(e)=> {
                        console.log(e.target.value);
                        setBloodLevel(e.target.value);
                    }}>
                        {/* <FontAwesomeIcon icon={faDroplet} size="3x" /> */}
                    </button>
                    <button id="2" className="small-blood-level-block" value={2} onClick={(e)=> {
                        console.log(e.target.value);
                        setBloodLevel(e.target.value);
                    }}>
                        {/* <FontAwesomeIcon icon={faDroplet} size="3x"/>
                        <FontAwesomeIcon icon={faDroplet} size="3x" /> */}
                    </button>
                    <button id="3" className="small-blood-level-block" value={3} onClick={(e)=> {
                        console.log(e.target.value);
                        setBloodLevel(e.target.value);
                    }}>
                        {/* <FontAwesomeIcon icon={faDroplet} size="3x" />
                        <FontAwesomeIcon icon={faDroplet} size="3x" />
                        <FontAwesomeIcon icon={faDroplet} size="3x" /> */}
                    </button>
                </div>
            <div className="home-title">DIARY</div>
                <input rows={10} placeholder="What do you feel today?" maxLength={1000} className='diary-container' ref={diaryRef} />
                 
            <br></br>
            <Button type="primary" onClick={submitDiary} >Save</Button>
        </div>
    </div>
);
}

export default Home;