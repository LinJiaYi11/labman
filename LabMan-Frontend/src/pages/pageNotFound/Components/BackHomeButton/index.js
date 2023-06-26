import { Button } from "antd";
import { useNavigate } from "react-router";

const BackHomeButton = () => {
	const navigate = useNavigate();
	const redirectToLogin = () => {
		navigate("/login");
	};

	return (
		<Button
			type="primary"
			onClick={redirectToLogin}>Back Home</Button>
	);
};

export default BackHomeButton;