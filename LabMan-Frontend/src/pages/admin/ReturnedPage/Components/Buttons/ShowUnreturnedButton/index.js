import { Button } from "antd";
import {useNavigate} from "react-router-dom";

const ShowUnreturnedButton = () => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate("/admin/return");
	};

	return (
		<Button onClick={onClick}>
            Show Unreturned
		</Button>
	);
};

export default ShowUnreturnedButton;