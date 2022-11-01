import { InputNumber, Space } from 'antd';
import React from 'react';
import './input.css'

const onChange = (value) => {
  console.log('changed', value);
};
const Input_period = () => (
  <Space>
    <InputNumber min={1} max={100000} defaultValue={7} onChange={onChange} className="input-border"/>
  </Space>
);
export default Input_period;