import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Slider } from 'antd';
import React, { useState } from 'react';
import './input.css'


const IconSlider = (props) => {
const { max, min } = props;
const [value, setValue] = useState(0);
const mid = Number(((max - min) / 2).toFixed(5));
const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
const nextColorCls = value >= mid ? 'icon-wrapper-active' : '';
return (
    <div className="icon-wrapper">
    <SmileOutlined className={preColorCls} />
    <Slider {...props} onChange={setValue} value={value} />
    <FrownOutlined className={nextColorCls} />
    </div>
);
};
const App = () => <IconSlider min={0} max={10} />;
export default App;