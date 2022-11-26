import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import LogoPic from "./pics/app_logo.png";
import Droplet from "./pics/droplet.png";
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
import Swal from 'sweetalert2';
import ButtonKub from './ButtonKub'

function Home() {
 // React States
const [errorMessages, setErrorMessages] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);
const [painLevel, setPainLevel] = useState(0);
const [bloodLevel, setBloodLevel] = useState(1);
const diaryRef = useRef();


// States for edit button
const [historyDiary, setHistoryDiary] = useState({
    old_diary_text: "",
    old_blood_level: "",
    old_pain_level: "",
})

//set diary
const [diaryValue, setDiaryValue] = useState('')

//set btn save and edit
const [saveBtn, setSaveBtn] = useState(true);
const [editBtn, setEditBtn] = useState(false);

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

//set luteal

const [luteal, setLuteal] = useState([])

// const [x,X] = useState([])
    
useEffect(() => {
    try {
        const url_diary = 'https://creammmm.pythonanywhere.com/api/diary' + '?uid=' + currentUser.uid
        // const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')

        fetch(url_diary).then((res_diary) => {
            res_diary.json().then((res_all_diary) => {
                console.log("all", res_all_diary)
                // const painData = []
                // const dateData = []
                let check = 0;
                res_all_diary.forEach((resGetDiary) => {
                    const pain = resGetDiary.pain_level
                    const blood = resGetDiary.blood_level
                    const diary = resGetDiary.diary_text
                    const date_diary = resGetDiary.date
                    console.log("History diary", historyDiary);
                    // painData.push(pain)
                    console.log("click",DateToString(date))
                    // console.log(diaryRef.current.value == '55')

                    if(date_diary === DateToString(date)) {
                        console.log('Hello test')
                        console.log(blood)
                        check = 9999
                        console.log(check)
                        setDiaryValue(diary)
                        setPainLevel(pain)
                        setBloodLevel(blood)
                        historyDiary.old_diary_text = diary;
                        historyDiary.old_blood_level = blood;
                        historyDiary.old_pain_level = pain;
                        if (blood == 1) {
                            setactiveBtnBlood1(false);
                            setactiveBtnBlood2(true);
                            setactiveBtnBlood3(true);
                        }
                        if (blood == 2) {
                            setactiveBtnBlood2(false);
                            setactiveBtnBlood1(true);
                            setactiveBtnBlood3(true);
                        }
                        if (blood == 3) {
                            setactiveBtnBlood3(false);
                            setactiveBtnBlood1(true);
                            setactiveBtnBlood2(true);
                        }
                    } 
                    else {
                        if (check == 0) {
                            setBloodLevel(0)
                            setSaveBtn(true)
                            setEditBtn(false)
                            console.log('success')
                            setDiaryValue('')    
                            setPainLevel(0);
                            setactiveBtnBlood3(true);
                            setactiveBtnBlood1(true);
                            setactiveBtnBlood2(true);

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
    let url = "https://creammmm.pythonanywhere.com/api/period";
    fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ 
            period_phase: JSON.stringify(data),
            uid: currentUser.uid
        })
    }).then((response)=>{
        console.log("response period",response)
        const url = 'https://creammmm.pythonanywhere.com/api/predict' + '?uid=' + currentUser.uid
        const url2 = 'https://creammmm.pythonanywhere.com/api/period' + '?uid=' + currentUser.uid
        const url_luteal = 'https://creammmm.pythonanywhere.com/api/luteal' + '?uid=' + currentUser.uid
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
                fetch(url_luteal).then((resLuteal) => {
                    resLuteal.json().then((res_json) => {
                        console.log("Callback lu", res_json.result)
                        setLuteal(res_json.result)
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
    setSaveBtn(false)
    setEditBtn(true)
    e.preventDefault();
    Swal.fire({
        title: 'Your note is already saved!',
        showClass: {
        popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
        }
    })
    let url = "https://creammmm.pythonanywhere.com/api/diary";
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

function handleEdit(e) {
    e.preventDefault();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your change has been saved',
        showConfirmButton: false,
        timer: 1500
    })
    var new_pain = historyDiary.old_pain_level;
    var new_blood = historyDiary.old_blood_level;
    var new_diary = historyDiary.old_diary_text
    if (painLevel != historyDiary.old_pain_level)
    {
        console.log("pain change");
        // new_dict["pain_level"] = painLevel;
        new_pain = painLevel;
    }
    if (bloodLevel != historyDiary.old_blood_level)
    {
        console.log("blood change");
        // new_dict["blood_level"] = bloodLevel;
        new_blood = bloodLevel;
    }
    if (diaryRef.current.value != historyDiary.old_diary_text)
    {
        console.log("diary change");
        // new_dict["diary_text"] = diaryRef;
        new_diary = diaryRef.current.value;
    }
    console.log("new", new_diary);
    let url = "https://creammmm.pythonanywhere.com/api/diary";
    fetch(url, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ 
        diary_text: new_diary,
        blood_level: new_blood,
        pain_level: new_pain,
        uid: currentUser.uid,
        date: DateToString(date)}),
    })
    .catch((err) => console.log(err));
}



useEffect(async () => {
    console.log("TEST")
    try {
        const url2 = 'https://creammmm.pythonanywhere.com/api/period' + '?uid=' + currentUser.uid
        const url_luteal = 'https://creammmm.pythonanywhere.com/api/luteal' + '?uid=' + currentUser.uid
        // const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        const res2 = await fetch(url2)
        const res_json2 = await res2.json()
        console.log("res_json2 = ",res_json2)
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

        const resLuteal = await fetch(url_luteal)
        const res_Luteal_json = await resLuteal.json()
        console.log("luteal day= ",res_Luteal_json.result) // luteal day
        setLuteal(res_Luteal_json.result)

        const url = 'https://creammmm.pythonanywhere.com/api/predict' + '?uid=' + currentUser.uid
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

useEffect(() => {
    console.log("luuteal change",luteal)
        
},[luteal])
    

const [activeBtnBlood1, setactiveBtnBlood1] = useState(true)
const [activeBtnBlood2, setactiveBtnBlood2] = useState(true)
const [activeBtnBlood3, setactiveBtnBlood3] = useState(true)

return (
    <div className="home">
        <Calendars className="component-calendar" date={date} setDate={setDate} rangeDate={rangeDate} setRangeDate={setR} period={period} luteal={luteal} />
        

        {/* <button type="button" onClick={(ev) => {console.log("button",rangeDate)}} >rangeDate</button> */}
        {/* <button type="button" onClick={() => setClick(click+1)} >setClick</button> */}
        <div className="home-form">
            <div className="home-title">PAIN LEVEL</div>
                <div className="pain-level-container">
                    <Slider className="slider-position" onChange={setPainLevel} value={painLevel} min={0} max={10}></Slider>
                </div>
            <div className="home-title">BLOOD LEVEL</div>
                
            <div className="blood-level-container">
                    {[1, 2, 3].map((value, index) => (
                        <ButtonKub
                        imageSrc={Droplet}
                        value={value}
                        active={bloodLevel === value}
                        setBloodLevel={() => {
                            setBloodLevel(value);
                        }}
                        key={index}
                        />
                        ))}
                    </div>
            <div className="home-title">DIARY</div>
                <textarea rows={10} placeholder="How do you feel today?" maxLength={1000} className='diary-container' ref={diaryRef} value={diaryValue} onChange={(e) => setDiaryValue(e.target.value)}/>
            <br></br>
            { saveBtn ? <button id="submit" className="home-submit" type="submit" onClick={handleSubmit} >Save</button>: null}
            { editBtn ? <button id="submit" className="home-submit" type="submit" onClick={handleEdit} >Edit</button>: null}
        </div>
        <span><button className="backtologin" type="primary" variant="link" onClick={() => {auth.signOut(); window.location.href = "./login"}}>
            <p className="log">
            <LogoutOutlined className="icon_log"/>Logout</p></button></span>

    </div>
);
}

export default Home;