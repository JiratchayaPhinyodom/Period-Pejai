import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import 'antd/dist/antd.css';
import React, { useState, useEffect } from "react";
import { Button } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import { SettingOutlined, HomeOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';

function Calendars({date, setDate, rangeDate, setRangeDate, period, luteal}) {

  // console.log(period)
  useEffect(() => {
    // console.log("in period change ==>",rangeDate,period)
    let range_date = rangeDate
    const events2 = setEvents2(range_date)
    if (period != [])
    {
      setCalen(<Calendar
    onChange={setDate}
    value={date}
    locale="US"
    tileClassName={({date}) => 
        {
          let day = date.getDate()
          let month = date.getMonth() + 1
          if(date.getMonth() < 10) {
            month = '0' + month
          }
          if(date.getDate() < 10) {
            day = '0' + day
          }
          const realDate = date.getFullYear() + '-' + month + '-' + day
          if(events2.find(val => val === realDate)) {
            return 'highlight'
          }
          if(period.find(val => val === realDate)) {
            return 'highlight2'
          }
          if(luteal.find(val => val === realDate)) {
            return 'highlight3'
          }
        }
      }
  />)}
  },[period], [luteal])

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

  const CheckDateMonthYear = (startDay, endDay) => {
    if (startDay.getDate() === endDay.getDate()) {
      if (startDay.getMonth() === endDay.getMonth()) {
        if (startDay.getFullYear() === endDay.getFullYear()) {
          return true
        }
      }
    }
  }

  const setEvents2 = (eventsX) => {
    // console.log(eventsX)
    let events2 = []
    eventsX.forEach((events) => {
      const start = new Date(Date.parse(events[0]))
      const endd = new Date(Date.parse(events[1]))
      let i = 0
      while(1){
        const nextday = new Date(Date.parse(events[0]));
        nextday.setDate(start.getDate() + i);
        // console.log(i,nextday,endd)
        const str_nextday = DateToString(nextday)  
        events2 = [...events2, str_nextday]
        i += 1
        if (CheckDateMonthYear(nextday, endd) === true) {
          break
        }
      }
    }) 
    
    // console.log(events2)
    return events2
  }

  //ใช้ในนี้ต้องเป็นแค่ปีเดือนวัน
  const { RangePicker } = DatePicker;
  // let result = []
  const [calen, setCalen] = useState(<Calendar
    onChange={setDate}
    value={date}
    locale="US"
  />)

  const [collectRangeDate, setCollectRangeDate] = useState([])
  const [showBtn, setShowBtn] = useState(false)
  // const [rangeDate, setRangeDate] = useState([])
  const [predictCal, setPredictCal] = useState([])

  const onChange = (dates, dateStrings) => {
    let listRangeDate = []
    if (dates) {
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      // console.log("result = ", temp_reTemp)
      listRangeDate.push(dateStrings[0]) //[[st,en], [], []]
      listRangeDate.push(dateStrings[1])
      setCollectRangeDate(listRangeDate)
      setShowBtn(true)
    } else {
      console.log('Clear');
      setCollectRangeDate(listRangeDate)
    }
    
  };

  const submitDate = () => {
    console.log("in",collectRangeDate)
    // let range_date = rangeDate
    let range_date = []
    range_date.push(collectRangeDate)
    setRangeDate(range_date)
    // console.log("submitRangeDate", range_date) //ถ้าะส่งค่าเป็นช่วงใช้ตัวนี้
    // const events2 = setEvents2(range_date)
    // console.log("submitDate", events2) //ถ้าจะส่งค่าไปทุกวันที่ไฮไลท์ใช้อันนี้
    setShowBtn(false)
    // setCalen(<Calendar
    //   onChange={setDate}
    //   value={date}
    //   locale="US"
    //   tileClassName={({date}) => 
    //     {
    //       let day = date.getDate()
    //       let month = date.getMonth() + 1
    //       if(date.getMonth() < 10) {
    //         month = '0' + month
    //       }
    //       if(date.getDate() < 10) {
    //         day = '0' + day
    //       }
    //       const realDate = date.getFullYear() + '-' + month + '-' + day
    //       if(events2.find(val => val === realDate)) {
    //         return 'highlight'
    //       }
    //     }
    //   }
    // />)
  }

  return (
    <div className='calendar'>
      <span >
        <button className='backtosetting' type="primary" variant="link" onClick={()=>{window.location.href = "/"}}>
          <p className='set'>
          <SettingOutlined className='icon_set'/>Setting</p></button></span>

      <h1 className='text-center-title'>PERIOD-PEJAI CALENDAR</h1>
      <div className='calendar-container'>
        {calen}
      </div>
      {date.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Start:</span>{' '}
          {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Selected date:</span>{' '}
          {date.toDateString()}
        </p>
      )}
      
      {/* Use range date */}
      <p className='text-center'>When is your period come?</p>
        <div className='diary-period' ><RangePicker classNsme="userperiod" onChange={onChange} disabledDate={(current) => {
            let customDate = moment().format("YYYY-MM-DD");
            return current && current < moment(customDate, "YYYY-MM-DD").subtract(2, 'M');
          }} /> 
        </div> 
        {showBtn ? <button type="button" className="period-submit" onClick={() => { submitDate()}} >Save</button> : null }
          <br></br>
      </div>
  );
}

export default Calendars;