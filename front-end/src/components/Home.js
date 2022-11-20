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
import { useAuth } from '../contexts/AuthContext';
import axios from "axios";

function Home() {
 // React States
const [errorMessages, setErrorMessages] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);
const [painLevel, setPainLevel] = useState(0);
const [bloodLevel, setBloodLevel] = useState(1);
const diaryRef = useRef();
const uidRef = useRef();
const [periodPhase, setPeriodPhase] = useState(0);
const [dataDate, setDataDate] = useState(0);
const {currentUser} = useAuth();
    const [period, setPeriod] = useState([]);
    const [showCa, setShowCa] = useState(null)
// console.log(currentUser.uid)
const [home, userHome] = useState({
    diary_text: "",
    blood_level: "",
    pain_level: "",
    period_phase: "",
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
const [x,X] = useState([])
    
// useEffect(() => {
//     console.log("click date 1",date)
//     // call api ---> get data
//     // x.forEach((xx) => {
//     //     // if x.date == date
//     //     // x.aaaa
//     //     // x.bbbb 
//     //     // x.cccc
//     // })
// },[date])
// console.log('out',date)
useEffect(() => {
    try {
        const url_diary = 'http://127.0.0.1:8000/api/diary' + '?uid=' + currentUser.uid
        // const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')

        fetch(url_diary).then((res_diary) => {
            res_diary.json().then((res_all_diary) => {
                console.log("all", res_all_diary)
                const painData = []
                const dateData = []
                res_all_diary.forEach((resGetDiary) => {
                    const pain = resGetDiary.pain_level
                    const blood = resGetDiary.blood_level
                    const diary = resGetDiary.diary_text
                    const date_diary = resGetDiary.date
                    painData.push(pain)
                    console.log("click",DateToString(date))
                    if(date_diary === DateToString(date)) {
                        console.log('fuckkkkkkkkkkkkkkkkkk')
                        console.log(blood)
                        setPainLevel(pain)
                        if (blood == 1) {
                            setactiveBtnBlood1(false);
                            setactiveBtnBlood2(true);
                            setactiveBtnBlood3(true)
                        }
                        if (blood == 2) {
                            setactiveBtnBlood2(false);
                            setactiveBtnBlood1(true);
                            setactiveBtnBlood3(true)
                        }
                        if (blood == 3) {
                            setactiveBtnBlood3(false);
                            setactiveBtnBlood1(true);
                            setactiveBtnBlood3(true)
                        }

                    } 
                })
            })
        })
    }
    catch (error) {
        console.log(error)
    }
}, [date])
    
const setR = useCallback((data) => {
    console.log("date: ",data)
    // setRangeDate(data)

    // use data ---> call api
    // [[],[],[]] not use
    // [[]] use this
    let url = "http://127.0.0.1:8000/api/period";
    fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ 
            period_phase: JSON.stringify(data),
            uid: currentUser.uid
        })
    }).then((response)=>{
        console.log("response period",response)
        const url = 'http://127.0.0.1:8000/api/predict' + '?uid=' + currentUser.uid
        const url2 = 'http://127.0.0.1:8000/api/period' + '?uid=' + currentUser.uid
        // const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')

        fetch(url2).then((res2) => {
            res2.json().then((res_json2) => {

                console.log(res_json2)
                const periodData = []
                res_json2.forEach((ListInList) => {
                    const data = JSON.parse(ListInList.period_phase)
                    const data_willPush = data[0]
                    periodData.push(data_willPush)
                })
                console.log("period_data",periodData)
                setRangeDate(periodData)

                fetch(url).then((res) => {
                    res.json().then((res_json) => {
                        console.log("predict_data",res_json.result)
                        setPeriod(res_json.result)
                    })
                })
            })
        })
        
    })
    .catch((err) => console.log(err));
    console.log(
        JSON.stringify({ 
        period_phase: data,
        uid: currentUser.uid})
    );

},[rangeDate])


function handleSubmit(e) {
    e.preventDefault();
    let url = "http://127.0.0.1:8000/api/diary";
    fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ 
        diary_text: diaryRef.current.value,
        blood_level: bloodLevel,
        pain_level: painLevel,
        uid: currentUser.uid,
        date: DateToString(date)}),
    })
    .catch((err) => console.log(err));
}

// // Axios
// const [post, setPost] = React.useState(null);
// const baseURL = "http://127.0.0.1:8000/api/predict";
// React.useEffect(() => {
//     axios.get(baseURL).then((response) => {
//     setPost(response.data);
//     console.log(response);
//     });
// }, []);

// if (!post) return null;

useEffect(async () => {
    console.log("TEST")
    try {
        const url2 = 'http://127.0.0.1:8000/api/period' + '?uid=' + currentUser.uid
        const url3 = 'http://127.0.0.1:8000/api/luteal' + '?uid=' + currentUser.uid
        // const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        const res2 = await fetch(url2)
        const res3 = await fetch(url3)
        const res_json2 = await res2.json()
        const res_json3 = await res3.json()
        console.log("res_json2 = ",res_json2)
        console.log("res_json3 = ",res_json3) // luteal day
        const periodData = []
        // [ '[[]]','[[]]','[[]]' ]
        res_json2.forEach((ListInList) => {
            const data = JSON.parse(ListInList.period_phase)
            const data_willPush = data[0]
            // console.log("data = ",data[0])
            periodData.push(data_willPush)
        })
        // [ [], [], [] ]
        console.log("period_data",periodData)
        // setPeriod(res_json.result)
        setRangeDate(periodData)
        


        const url = 'http://127.0.0.1:8000/api/predict' + '?uid=' + currentUser.uid
        // const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        const res = await fetch(url)
        const res_json = await res.json()
        console.log("predict_data",res_json.result)
        setPeriod(res_json.result)

        
    } catch (error) {
        console.log(error)
    }
}, [])

    useEffect(() => {
    console.log("period change",period)
        
},[period])

const [activeBtnBlood1, setactiveBtnBlood1] = useState(true)
const [activeBtnBlood2, setactiveBtnBlood2] = useState(true)
const [activeBtnBlood3, setactiveBtnBlood3] = useState(true)

return (
    <div className="home">
        <Calendars className="component-calendar" date={date} setDate={setDate} rangeDate={rangeDate} setRangeDate={setR} period={period } />
        

        {/* <button type="button" onClick={(ev) => {console.log("button",rangeDate)}} >rangeDate</button> */}
        {/* <button type="button" onClick={() => setClick(click+1)} >setClick</button> */}
        <div className="home-form">
            <div className="home-title">PAIN LEVEL</div>
                <div className="pain-level-container">
                    <Slider onChange={setPainLevel} value={painLevel} min={0} max={10}></Slider>
                </div>
            <div className="home-title">BLOOD LEVEL</div>
                <div className="blood-level-container">
                {activeBtnBlood1 ? <button id="1" className="small-blood-level-block" value={1} onClick={(e)=> {
                         console.log(e.target.value);
                         setBloodLevel(e.target.value);
                         setactiveBtnBlood1(false);
                         setactiveBtnBlood2(true);
                         setactiveBtnBlood3(true)
                     }}>Little
                     </button> : <button id="1" className="small-blood-level-block" style = {{background:"#ffb5a7"}}value={1} onClick={(e)=> {
                         setactiveBtnBlood1(true);

                     }}>Little
                        </button>}
                     {activeBtnBlood2 ? <button id="2" className="small-blood-level-block" value={2} onClick={(e)=> {
                         console.log(e.target.value);
                         setBloodLevel(e.target.value);
                         setactiveBtnBlood2(false)
                         setactiveBtnBlood1(true)
                         setactiveBtnBlood3(true)
                     }}>Medium
                     </button> : <button id="2" className="small-blood-level-block" style = {{background:"#ffb5a7"}} value={2} onClick={(e)=> {
                         setactiveBtnBlood2(true)
                     }}>Medium</button>}
                     {activeBtnBlood3 ? <button id="3" className="small-blood-level-block" value={3} onClick={(e)=> {
                        //  console.log(e.target.value);
                         setBloodLevel(e.target.value);
                         setactiveBtnBlood3(false)
                         setactiveBtnBlood2(true)
                         setactiveBtnBlood1(true)
                     }}>A Lot
                     </button> : <button id="3" className="small-blood-level-block" style = {{background:"#ffb5a7"}} value={3} onClick={(e)=> {
                         // console.log(e.target.value);
                         // setBloodLevel(e.target.value);
                         setactiveBtnBlood3(true)
                     }}>A Lot</button>}
                </div>
            <div className="home-title">DIARY</div>
                <input rows={10} placeholder="What do you feel today?" maxLength={1000} className='diary-container' ref={diaryRef} />
            <br></br>
            <Button type="primary" onClick={handleSubmit} >Save</Button>
        </div>
        <span><Button className='route_home' type="primary" variant="link" onClick={()=>{window.location.href = "/"}} style={{ background: "#b8bedd"}}><p className='home_p' ><HomeOutlined className='icon_home'/>Setting</p></Button></span>

        <span><Button className='logout' type="primary" variant="link" onClick={() => {auth.signOut(); window.location.href = "./login"}} style={{ background: "#b8bedd"}}><p className='logout_p' ><LogoutOutlined className='icon_logout'/>Logout</p></Button></span>
        {/* <Button onClick={handle}> test</Button> */}

    </div>
);
}

export default Home;