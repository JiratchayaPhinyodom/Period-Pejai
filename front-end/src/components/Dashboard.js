import React, { useState, useEffect} from "react"
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
import { InputNumber, Space } from 'antd';
import Input from "antd/lib/input/Input";
import { DatePicker } from 'antd';
import moment from 'moment';
import Inst from "./pics/setting_inst.png";

import { auth } from '../firebase'


const Dashboard= () =>{
  const { currentUser} = useAuth()
  const history = useHistory();
  const [setting, userSetting] = useState({
    birth_year: 0,
    period_length: 0, 
    cycle_length: 0, 
    luteal_length: 0, 
    uid: currentUser.uid
  });

  // States for edit button
  const [historySetting, setHistorySetting] = useState({
    old_birth_year: 0,
    old_period_length: 0,
    old_cycle_length: 0,
    old_luteal_length: 0,
  });
  // const [latest, periodLatest] = useState({
  //   diary_text: "",
  //   blood_level: "",
  //   pain_level: "",
  //   start_date: "",
  //   end_date: "",
  //   uid: "",
  //   date: "",
  //   });
  // console.log(setting);

  // states for button
  const [saveBtnStt, setSaveBtnStt] = useState(true);
  const [editBtnStt, setEditBtnStt] = useState(false);


  const [collectRangeDateSetting, setCollectRangeDateSetting] = useState([])
  const [rangeDateSetting, setRangeDateSetting] = useState([])

  const [showBtnSave, setShowBtnSave] = useState(false)
  const [showRangeDatePicker, setshowRangeDatePicker] = useState(true)
  // useEffect (() => {
  //   if (btnCheck == 0) {
  //   }

  // })
  const [showBtnHome, setShowBtnHome] = useState(false)
  const [url, setUrl] = useState(window.location.href)

  const [checkPeriod, setCheckPeriod] = useState(false)

  // useEffect(async()=> {
  // console.log(url);
  // const url_line = new URL(url);
  // let params = url_line.searchParams;
  // const code = params.get('code'); // 'node'
  // console.log("code", code);
  // console.log("LINE GET request")
  //   try {
  //       const url_line_get = 'http://127.0.0.1:8000/api/get_token' + '?uid=' + currentUser.uid + '&' + '?code=' + code
  //       const res_line = await fetch(url_line_get)
  //       // const res_json_line = await res_line.json()
  //       // console.log("res_json_line = ",res_json_line)
  //     } catch (error) {
  //       console.log(error)
  //   }
  // },[url]);

  useEffect(async () => {
    try {
      console.log('uid',currentUser.id)
      const url_period = 'https://creammmm.pythonanywhere.com/api/period' + '?uid=' + currentUser.uid
      await fetch(url_period).then((res_period) => {
        if (res_period.status == 400) {
          console.log("undefind")
        }
        else {
          console.log('uid',currentUser.id)
          res_period.json().then((res_all_period) => {
            console.log("peee", res_all_period.length)
            if (res_all_period.length > 0) {
              console.log('kkkkk')
              setCheckPeriod(true)
            }
            // else {
            //   setCheckPeriod(false)
            // }
          })
        }
      })
    }
    catch (error) {
      console.log(error)
  }
  }, [currentUser])

//   const saveConfirm = () => {
//   Swal.fire({
//     title: 'Your information has been saved!',
//     width: 600,
//     padding: '3em',
//     color: '#716add',
//     background: '#fff',
//     backdrop: `
//       rgba(0,0,123,0.4)
//     `
//   })
// }

  const { RangePicker } = DatePicker;

  const onChange = (dates, dateStrings) => {
    let listRangeDate = []
    if (dates) {
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      // console.log("result = ", temp_reTemp)
      listRangeDate.push(dateStrings[0]) //[[st,en], [], []]
      listRangeDate.push(dateStrings[1])
      setCollectRangeDateSetting(listRangeDate)
      setShowBtnSave(true)
    } else {
      console.log('Clear');
      setCollectRangeDateSetting(listRangeDate)
    }
    
  };

  const submitDate = () => {
    // console.log("in",rangeDate,collectRangeDate)
    let range_date = rangeDateSetting
    range_date.push(collectRangeDateSetting)
    setRangeDateSetting(range_date)
    const body = {
      period_phase: JSON.stringify(range_date),
      uid: currentUser.uid
    }
    console.log(JSON.stringify(body))
    let url = "https://creammmm.pythonanywhere.com/api/period";
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    })
    .then((response) => {
      console.log(response)
      window.location.reload(false)
    })
    // console.log("submitRangeDate in setting page", range_date)
    // console.log("submitRangeDate", range_date) //ถ้าะส่งค่าเป็นช่วงใช้ตัวนี้
    // setShowBtnSetting(false)
    setshowRangeDatePicker(false)
    setShowBtnSave(false)
  }

function handleInfoSubmit(e) {
  console.log(typeof parseInt(setting.birth_year), typeof parseInt(setting.period_length), typeof parseInt(setting.cycle_length), typeof parseInt(setting.luteal_length))
  if (typeof parseInt(setting.birth_year) === "number" && typeof parseInt(setting.period_length) === "number" && typeof parseInt(setting.cycle_length) === "number" && typeof parseInt(setting.luteal_length) === "number"){
    console.log(typeof setting.birth_year, typeof setting.period_length, typeof parseInt(setting.cycle_length), typeof setting.luteal_length)
    if (parseInt(setting.birth_year) > 1960 && parseInt(setting.birth_year) < 2022 && parseInt(setting.period_length) > 0 && parseInt(setting.cycle_length) > 0 && parseInt(setting.luteal_length) > 0) {
      console.log(typeof setting.birth_year, typeof setting.period_length, typeof parseInt(setting.cycle_length), typeof setting.luteal_length)
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
        // setLoadingInput(true)
      // hover()
      console.log('success')
      e.preventDefault();
      let url = "https://creammmm.pythonanywhere.com/api/setting";
      fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(setting)
    })
    .then((response) => {
      userSetting({
      birth_year: "",
      period_length: "", 
      cycle_length: "", 
      luteal_length: "", 
      uid: currentUser.uid})
      window.location.reload(false);
    })
    .catch((err) => console.log(err));
    }
    else {
      alert("Please fill in correctly. You can see the instruction on the menu tab.")
    }
  }
  else {
    alert("Please fill in correctly. You can see the instruction on the menu tab.")
  }
}

function handleEditStt(e) {
  console.log(typeof parseInt(setting.birth_year), typeof parseInt(setting.period_length), typeof parseInt(setting.cycle_length), typeof parseInt(setting.luteal_length))
  if (typeof parseInt(setting.birth_year) === "number" && typeof parseInt(setting.period_length) === "number" && typeof parseInt(setting.cycle_length) === "number" && typeof parseInt(setting.luteal_length) === "number"){
    console.log(typeof setting.birth_year, typeof setting.period_length, typeof parseInt(setting.cycle_length), typeof setting.luteal_length)
    if (parseInt(setting.birth_year) > 1960 && parseInt(setting.birth_year) < 2022 && parseInt(setting.period_length) > 0 && parseInt(setting.cycle_length) > 0 && parseInt(setting.luteal_length) > 0) {
      console.log(typeof setting.birth_year, typeof setting.period_length, typeof parseInt(setting.cycle_length), typeof setting.luteal_length)
  e.preventDefault();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your change has been saved',
    showConfirmButton: false,
    timer: 1500
  })
  var new_birth = historySetting.old_birth_year;
  var new_period_length = historySetting.old_period_length;
  var new_cycle_length = historySetting.old_cycle_length;
  var new_luteal_length = historySetting.old_luteal_length;
  if (setting.birth_year != historySetting.old_birth_year)
  {
      console.log("pain change");
      // new_dict["pain_level"] = painLevel;
      new_birth = setting.birth_year;
  }
  if (setting.period_length != historySetting.old_period_length)
  {
      console.log("pain change");
      // new_dict["pain_level"] = painLevel;
      new_period_length = setting.period_length;
  }
  if (setting.cycle_length != historySetting.old_cycle_length)
  {
      console.log("blood change");
      // new_dict["blood_level"] = bloodLevel;
      new_cycle_length = setting.cycle_length;
  }
  if (setting.luteal_length != historySetting.old_luteal_length)
  {
      console.log("diary change");
      // new_dict["diary_text"] = diaryRef;
      new_luteal_length = setting.luteal_length;
  }
  let url = "https://creammmm.pythonanywhere.com/api/setting";
  fetch(url, {
  method: "PATCH",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify({ 
    birth_year: new_birth,
    period_length: new_period_length, 
    cycle_length: new_cycle_length, 
    luteal_length: new_luteal_length, 
    uid: currentUser.uid,
  }),
    
  })
  .catch((err) => console.log(err));
  }
  else {
    alert("Please fill in correctly. You can see the instruction on the menu tab.")
  }
}
  else {
    alert("Please fill in correctly. You can see the instruction on the menu tab.")
  }
}

  useEffect(() => {
    try {
      const url_data = 'https://creammmm.pythonanywhere.com/api/data' + '?uid=' + currentUser.uid
      fetch(url_data).then((res_data) => {
        // {birth_year: 2002, period_length: 7, cycle_length: 28, luteal_length: 14, uid: '6FzQ7n2JRQfygAwkXpKhJOfa83v2'}
        // console.log("all", res_data.json())
        if (res_data.status == 400) {
          console.log("undefind")
        }
        else {
        res_data.json().then((res_all_data) => { 

          console.log('all_data', res_all_data)
          let check = 0;
          res_all_data.forEach((resGetData) => {
            const user = resGetData.uid
            const birth_year = resGetData.birth_year
            const period_length = resGetData.period_length
            const luteal_length = resGetData.luteal_length
            const cycle_length = resGetData.cycle_length

            historySetting.old_cycle_length = resGetData.birth_year
            historySetting.old_period_length = resGetData.period_length
            historySetting.old_luteal_length = resGetData.luteal_length
            historySetting.old_cycle_length = resGetData.cycle_length

            // console.log('all', user)
            if (user === currentUser.uid) {
              check = 5555
              console.log('check', user, birth_year, period_length, luteal_length, cycle_length)
              userSetting({ ...setting, birth_year: birth_year, period_length: period_length, luteal_length: luteal_length, cycle_length: cycle_length })
              setSaveBtnStt(false)
              setEditBtnStt(true)
            }
            else {
              if (check === 0) {
                console.log('Edit mode lock')
                setSaveBtnStt(true)
                setEditBtnStt(false)
              }
            }
          })
        
        })}
      })
    }
    catch (error) {
      console.log(error)
    }
  }, [])

  // const [loadingInput, setLoadingInput] = useState(false)
  // useEffect(()=> {
  //   console.log('type', typeof setting.birth_year)
  //   if (typeof setting.birth_year === "number" && typeof setting.period_length === "number" && typeof setting.cycle_length === "number" && typeof setting.luteal_length){
  //     if (setting.birth_year > 1960 && setting.birth_year < 2022 && setting.period_length > 0 && setting.cycle_length > 0 && setting.period_length > 0) {
  //       setLoadingInput(true)
  //       // hover()
  //       console.log('success')
  //     }
  //     }
  //   },[setting])

  return (
    <div className='App'>
    <div className='left-side'>
    <h1 className="h1-setting">WELCOME TO PERIOD-PEJAI</h1>
    {currentUser && (
      <>
          <img src={currentUser.photoURL} alt="" className="profile-user"/>
          <h2 className="name-user">{currentUser.displayName.toUpperCase()}</h2> </>
    )}

    <span className='setting'>
      <SettingOutlined className='icon_setting'/><p className='setting_p'>Setting</p>
    </span>
    <span>
    {/* showBtnHome &&  */}
    { editBtnStt && checkPeriod ? <Button className='route_home' type="primary" variant="link" onClick={()=>{window.location.href = "/home"}} style={{ background: "#b8bedd"}}>
        <HomeOutlined className='icon_home'/>
        <p className='home_p' >Home</p>
      </Button> : null}
    </span>
    <a className='reminder2' href={Inst}>SETTING INSTRUCTION</a>
    <p className='reminder'>CONNECT WITH LINE</p>
      {/* <ToggleSwitch label="Period"/>
      <ToggleSwitch label="Ovaluation"/> */}
    <a href="https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=3i37SxxITCH1t4ngUNAPuz&redirect_uri=https://period-pejai-deploy.vercel.app/&scope=notify&state=abcdef123456">
            <img src={LineLink} className="line-logo" height = "50px"/>
    </a>
    <span>
      <Button className='logout' type="primary" variant="link" onClick={() => {auth.signOut(); {window.location.href = "./login"}}} style={{ background: "#b8bedd"}}>
        <LogoutOutlined className='icon_logout'/>
          <p className='logout_p' >Logout</p>
        </Button>
    </span>
  </div>
  <form onSubmit={handleInfoSubmit}>
  <div className='bc-input'>
    <div className='input'>
      <span className='box-year'>
        <p className='year'>YEAR OF BIRTH </p>
        <input type="number" value={setting.birth_year} maxLength={1992} minLength={2000} className="input-border" placeholder="2002" onChange={(e) => userSetting({ ...setting, birth_year: e.target.value })}/>
      </span>
      <span className='box-period'>
        <p className='period-length'>PERIOD LENGTH </p>
        <input type="number" value={setting.period_length} maxLength={60} minLength={1} className="input-border" placeholder="7" onChange={(e) => userSetting({ ...setting, period_length: e.target.value })}/>
      </span>
      <span className='box-cycle'>
        <p className='cycle-length'>CYCLE LENGTH </p>
        <input type="number" value={setting.cycle_length} maxLength={60} minLength={1} className="input-border" placeholder="28" onChange={(e) => userSetting({ ...setting, cycle_length: e.target.value })}/>
      </span>
      <span className='box-phase'>
        <p className='phase-length'>LUTHEAL PHASE LENGTH </p>
        <input type="number" value={setting.luteal_length} maxLength={60} minLength={1}  className="input-border" placeholder="14" onChange={(e) => userSetting({ ...setting, luteal_length: e.target.value })}/>
      </span>
      { saveBtnStt ? <button id="submit" className="setting-submit" type="submit" > Save </button>: null }
      { editBtnStt ? <button id="submit" className="setting-submit" type="submit" onClick={handleEditStt} > Edit </button>: null }
      <p className="must">You must fill here first</p>
      <div className="periodLastMonth">
        <p className="last-month">Period Last Month</p>
        {showRangeDatePicker ? <RangePicker onChange={onChange} className='setting-range-picker'
        disabledDate={(current) => {
          let customDate = moment().format("YYYY-MM-DD");
          return current && current < moment(customDate, "YYYY-MM-DD").subtract(2, 'M');
        }} 
        
        /> : <p className="calculated">The next menstrual cycle has been calculated.</p> }

      </div>
      {showBtnSave ? <button className="period-submit" type="button" onClick={() => { submitDate()}} >Save</button> : null }
    </div>
  </div>
  </form>
</div>
  )
}

export default Dashboard;