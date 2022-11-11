
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import 'antd/dist/antd.css';
import React, { useState } from "react";

import { DatePicker } from 'antd';

import 'moment/locale/zh-cn';


function Calendars() {


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

  const setEvents2 = (events) => {
    let events2 = []
    const start = new Date(Date.parse(events[0]))
    const endd = new Date(Date.parse(events[1]))
    let i = 0
    while(1){
      const nextday = new Date(Date.parse(events[0]));
      nextday.setDate(start.getDate() + i);
      console.log(i,nextday,endd)
      const str_nextday = DateToString(nextday)  
      events2 = [...events2, str_nextday]
      i += 1
      if (CheckDateMonthYear(nextday, endd) === true) {
        break
      }
    }
    console.log(events2)
    return events2
  }

  const [date, setDate] = useState(new Date());
  //ใช้ในนี้ต้องเป็นแค่ปีเดือนวัน
  const { RangePicker } = DatePicker;
  let result = []
  const [calen, setCalen] = useState(<Calendar
    onChange={setDate}
    value={date}
    locale="US"

  />)

    

  const onChange = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      result.push(dateStrings[0])
      result.push(dateStrings[1])
      console.log(result)
    } else {
      console.log('Clear');
    }
    const events2 = setEvents2(result)
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
    return result
  };


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
      <RangePicker onChange={onChange} />
    </div>
  );
}

export default Calendars;