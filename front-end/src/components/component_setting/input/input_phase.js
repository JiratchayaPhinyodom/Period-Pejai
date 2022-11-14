import { InputNumber, Space } from 'antd';
import React from 'react';
import './input.css'

const onChange = (value) => {
  console.log('changed', value);
};
const Input_phase = () => (
  <Space>
    <InputNumber min={1} max={100000} defaultValue={14} onChange={onChange} className="input-border"/>
  </Space>
);
export default Input_phase;