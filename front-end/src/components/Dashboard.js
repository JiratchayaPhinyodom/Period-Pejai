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

import { auth } from '../firebase'


const Dashboard= () =>{
  const [error, setError] = useState("")
  const { currentUser} = useAuth()
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const [setting, userSetting] = useState({
    birth_year: "",
    period_length: "", 
    cycle_length: "", 
    luteal_length: "", 
    uid: currentUser.uid
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
  console.log(setting);

  const [information, setInformation] = useState(false)
  const [collectRangeDateSetting, setCollectRangeDateSetting] = useState([])
  const [rangeDateSetting, setRangeDateSetting] = useState([])
  const [showBtnSetting, setShowBtnSetting] = useState(true)
  const [showRangeDatePicker, setshowRangeDatePicker] = useState(false)
  const [showBtnHome, setShowBtnHome] = useState(false)

  const saveConfirm = () => {
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
  setInformation(true);
}

  const { RangePicker } = DatePicker;

  const onChange = (dates, dateStrings) => {
    let listRangeDate = []
    if (dates) {
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      // console.log("result = ", temp_reTemp)
      listRangeDate.push(dateStrings[0]) //[[st,en], [], []]
      listRangeDate.push(dateStrings[1])
      setCollectRangeDateSetting(listRangeDate)
      // setShowBtnSetting(true)
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
    let url = "http://127.0.0.1:8000/api/period";
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    })
    .then((response) => {
      console.log(response)
    })
    // console.log("submitRangeDate in setting page", range_date)
    // console.log("submitRangeDate", range_date) //ถ้าะส่งค่าเป็นช่วงใช้ตัวนี้
    // setShowBtnSetting(false)
    setshowRangeDatePicker(false)
    setShowBtnHome(true)
  }

function handleInfoSubmit(e) {
  e.preventDefault();
    let url = "http://127.0.0.1:8000/api/setting";
    fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(setting)
  })
  .then((response) => {
    userSetting({birth_year: "",
    period_length: "", 
    cycle_length: "", 
    luteal_length: "", 
    uid: currentUser.uid})
  })
  .catch((err) => console.log(err));
}

// function handleLatestSubmit(e) {
//   // userHome({ diary_text: diaryRef.current.value,
//   // blood_level: bloodLevel,
//   // pain_level: painLevel,})
//   e.preventDefault();
//   let url = "http://127.0.0.1:8000/api/diary";
//   fetch(url, {
//   method: "PUT",
//   headers: { "Content-type": "application/json" },
//   body: JSON.stringify({ diary_text: diaryRef.current.value,
//       blood_level: bloodLevel,
//       pain_level: painLevel,
//       start_date: rangeDate[0],
//       end_date: rangeDate[1],
//       uid: "",
//       date: DateToString(date),}),
//   })
//   .catch((err) => console.log(err));
// }

  useEffect(() => {
    try {
      const url_data = 'http://127.0.0.1:8000/api/data' + '?uid=' + currentUser.uid
      fetch(url_data).then((res_data) => {
        // {birth_year: 2002, period_length: 7, cycle_length: 28, luteal_length: 14, uid: '6FzQ7n2JRQfygAwkXpKhJOfa83v2'}
        // console.log("all", res_data.json())
        res_data.json().then((res_all_data) => { 

          console.log('all_data', res_all_data)
          let check = 0;
          res_all_data.forEach((resGetData) => {
            const user = resGetData.uid
            const birth_year = resGetData.birth_year
            const period_length = resGetData.period_length
            const luteal_length = resGetData.luteal_length
            const cycle_length = resGetData.cycle_length
            console.log('all', user)
            if (user === currentUser.uid) {
              check = 5555
              console.log('check', user, birth_year, period_length, luteal_length, cycle_length)
              userSetting({ ...setting, birth_year: birth_year, period_length: period_length, luteal_length: luteal_length, cycle_length: cycle_length })
            }
            else {
              if (check === 0) {
                console.log('yeahhhhh')
              }
            }
          })

        })
      })

    }
    catch (error) {
      console.log(error)
    }
  }, [])

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
    {showBtnHome && information ? <Button className='route_home' type="primary" variant="link" onClick={()=>{window.location.href = "/home"}} style={{ background: "#b8bedd"}}>
        <HomeOutlined className='icon_home'/>
        <p className='home_p' >Home</p>
      </Button> : null}
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
  <form onSubmit={handleInfoSubmit}>
  <div className='bc-input'>
    <div className='input'>
      <span className='box-year'>
        <p className='year'>YEAR OF BIRTH </p>
        <input type="number" value={setting.birth_year} className="input-border" placeholder="2002" onChange={(e) => userSetting({ ...setting, birth_year: e.target.value })}/>
      </span>
      <span className='box-period'>
        <p className='period-length'>PERIOD LENGTH </p>
        <input type="number" value={setting.period_length} className="input-border" placeholder="7" onChange={(e) => userSetting({ ...setting, period_length: e.target.value })}/>
      </span>
      <span className='box-cycle'>
        <p className='cycle-length'>CYCLE LENGTH </p>
        <input type="number" value={setting.cycle_length} className="input-border" placeholder="28" onChange={(e) => userSetting({ ...setting, cycle_length: e.target.value })}/>
      </span>
      <span className='box-phase'>
        <p className='phase-length'>LUTHEAL PHASE LENGTH </p>
        <input type="number" value={setting.luteal_length} className="input-border" placeholder="14" onChange={(e) => userSetting({ ...setting, luteal_length: e.target.value })}/>
      </span>
      <button id="submit" className="setting-submit" type="submit" onClick={saveConfirm}> Save </button>
      <div className="periodLastMonth">
        <p className="last-month">Period Last Month</p>
        {showRangeDatePicker ? <RangePicker onChange={onChange} className='setting-range-picker'/> : <p className="calculated">The next menstrual cycle has been calculated.</p> }
      </div>
      {showBtnSetting ? <button className="period-submit" type="button" onClick={() => { submitDate()}} >Save</button> : null }
    </div>
  </div>
  </form>
</div>
  )
}

export default Dashboard;

// แป้งโกะทำ submit date แล้วเราจะสร้าง handle submit ไว้ไหนนะ