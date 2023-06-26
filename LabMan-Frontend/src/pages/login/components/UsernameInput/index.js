import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
const UsernameInput = ({onChange}) => (
	<Input size="large" placeholder="input username" prefix={<UserOutlined />} 
		onChange={onChange}/>
);
export default UsernameInput;