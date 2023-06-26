import { Tooltip } from "antd";
import { useNavigate } from "react-router";
import {ZoomInOutlined} from "@ant-design/icons";

const ShowDetailButton = ({course_id}) => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate(`/admin/course/${course_id}`);
	};
    
	return(
		<>
			<Tooltip title={"Show course detail"}>
				<ZoomInOutlined
					style={{fontSize: "20px"}}
					onClick={onClick}                  
				/>
			</Tooltip>
		</>
	);
};

export default ShowDetailButton;