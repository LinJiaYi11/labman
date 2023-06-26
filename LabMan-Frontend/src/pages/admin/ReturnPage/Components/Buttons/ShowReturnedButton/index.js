import { Button } from "antd";
import { useNavigate } from "react-router";

const ShowReturnedButton = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/admin/return/returned");
	};
	return (
		<Button onClick={handleClick}>
            Show Returned Record
		</Button>
	);
};

export default ShowReturnedButton;