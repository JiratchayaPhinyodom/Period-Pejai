import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React from 'react';

const InputPassword = () => (
  <Space direction="vertical">
    <Input.Password
      placeholder="input password"
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
  </Space>
);
export default  InputPassword;