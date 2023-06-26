import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import {Input} from "antd";
import React from "react";
const UserPasswordInput = ({onChange}) => {
	return (
		<Input.Password
			placeholder="input password"
			iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
			onChange={onChange}
		/>
			
		
	);
};
export default UserPasswordInput;