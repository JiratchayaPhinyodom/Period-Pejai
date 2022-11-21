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
// import { rangeDate } from Calendars



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
    const [date, setDate] = useState();
    const [home, userHome] = useState({
        diary_text: "",
        blood_level: "",
        pain_level: "",
        start_date: "",
        end_date: "",
        uid: "",
        date: "",
        });

  // User Login info
//     const database = [
//     {
//         username: "user1",
//         password: "pass1"
//     },
//     {
//         username: "user2",
//         password: "pass2"
//     }
// ];

// const errors = {
//     uname: "invalid username",
//     pass: "invalid password"
// };

// const handleSubmit = (event) => {
//     //Prevent page reload
//     event.preventDefault();

//     var { uname, pass } = document.forms[0];

//     // Find user login info
//     const userData = database.find((user) => user.username === uname.value);

//     // Compare user info
//     if (userData) {
//         if (userData.password !== pass.value) {
//         // Invalid password
//         setErrorMessages({ name: "pass", message: errors.pass });
//     } else {
//         setIsSubmitted(true);
//     }
//     } else {
//       // Username not found
//         setErrorMessages({ name: "uname", message: errors.uname });
//     }
// };

//   // Generate JSX code for error message
//     const renderErrorMessage = (name) =>
//     name === errorMessages.name && (
//     <div className="error">{errorMessages.message}</div>
//     );

//   // JSX code for login form
//     const renderForm = (
//     <form onSubmit={handleSubmit}>
//     </form>
// );

// calen
const { TextArea } = Input;
// const onChangeDiary = (e)  => {
//     setDiary(e.target.value);
//     console.log('Change:', e.target.value);
//   };
// const [inputIcon, setInputIcon] = useState(1);
// const onChangeIcon = (newValue) => {
//     setInputIcon(newValue);
//     console.log(inputIcon)
// }


const submitDiary = ()=> {
    console.log(`Pain Level: ${painLevel}`);
    console.log(`Blood Level: ${bloodLevel}`);
    console.log(`Diary: ${diaryRef.current.value}`);
    // console.log(`Date: ${date.toDateString()}`) 
    // new
}

// const onChangeIcon = (e) => {
//     console.log('Change:', e.target.value);
// }

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
            <Button type="primary" onClick={handleSubmit} >Save</Button>
        </div>
    </div>
);
}

export default Home;