
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import 'antd/dist/antd.css';
import React, { useState } from "react";
import { Button } from 'antd';
import { DatePicker } from 'antd';


function Calendars({date, setDate, rangeDate, setRangeDate}) {

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
    console.log("in",rangeDate,collectRangeDate)
    let range_date = rangeDate
    range_date.push(collectRangeDate)
    setRangeDate(range_date)
    // console.log("submitRangeDate", range_date) //ถ้าะส่งค่าเป็นช่วงใช้ตัวนี้
    const events2 = setEvents2(range_date)
    // console.log("submitDate", events2) //ถ้าจะส่งค่าไปทุกวันที่ไฮไลท์ใช้อันนี้
    setShowBtn(false)
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
        }
      }
    />)
  }

  // const [collectBackOutRange, setCollectBackOutRangeDate] = useState([])
  // const [backOutRangeDate, setBackOutRangeDate] = useState([])
  // const [showBtnBackOut, setShowBtnBackOut] = useState(false)

  // const onChangeBackOut = (dates, dateStrings) => {
  //   let listRangeDate = []
  //   if (dates) {
  //     console.log('Back out','From: ', dateStrings[0], ', to: ', dateStrings[1]);
  //     listRangeDate.push(dateStrings[0]) //[[st,en], [], []]
  //     listRangeDate.push(dateStrings[1])
  //     setCollectBackOutRangeDate(listRangeDate)
  //     setShowBtnBackOut(true)
  //   } else {
  //     console.log('Clear');
  //     setCollectBackOutRangeDate(listRangeDate)
  //   }
  // }

  // const submitBackOutDate = (ev, backOutRangeDate) => {
  //   let backOut_rangeDate = backOutRangeDate
  //   backOut_rangeDate.push(collectBackOutRange)
  //   setBackOutRangeDate(backOut_rangeDate)
  //   console.log("submitBackOutRangeDate", backOut_rangeDate)
  //   const events_back_out = setEvents2(backOut_rangeDate)
  //   console.log("submitBackOutDate", events_back_out)
  //   setShowBtnBackOut(false)
  // }


  return (
    <div className='calendar'>
      <h1 className='text-center'>PERIOD-PEJAI CALENDAR</h1>
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
          <span className='bold'>Default selected date:</span>{' '}
          {date.toDateString()}
        </p>
      )}
      
      {/* Use range date */}
      <p>What the range of your period</p>
      <RangePicker onChange={onChange} /> 
      {showBtn ? <button type="button" onClick={() => { submitDate()}} >Save</button> : null }
        <br></br>
    </div>
    
   
  );
}

export default Calendars;
