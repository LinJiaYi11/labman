import { Tooltip } from "antd";
import { useNavigate } from "react-router";
import {ZoomInOutlined} from "@ant-design/icons";
import { usePackageContext } from "../../../Context";

const ShowDetailButton = ({package_id}) => {
	const {course_id} = usePackageContext();
	const navigate = useNavigate();

	const onClick = () => {
		navigate(`/admin/course/${course_id}/package_list/${package_id}`);
	};
    
	return(
		<>
			<Tooltip title={"Show package detail"}>
				<ZoomInOutlined
					style={{fontSize: "20px"}}
					onClick={onClick}                  
				/>
			</Tooltip>
		</>
	);
};

export default ShowDetailButton;