import { Button } from "antd";
import { useNavigate } from "react-router";

function LoginButton(props) {
	const navigate = useNavigate();

	const navigateToDashboard = () => {
		console.log("username:",props.username);
		console.log("password:",props.password);
		navigate("/admin/request");
	};

	return <Button type="primary" onClick={navigateToDashboard}>Login</Button>;
}

export default LoginButton;