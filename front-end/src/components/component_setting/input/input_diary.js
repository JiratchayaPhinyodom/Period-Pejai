import { Input } from 'antd';
import React from 'react';
import './input.css'
const { TextArea } = Input;
const InputDiary = () => (
<>
    <TextArea rows={9} placeholder="What do you feel today?" maxLength={350} className='diary-container'/>
</>
);
export default InputDiary;