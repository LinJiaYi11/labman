import {EditOutlined} from "@ant-design/icons";
import { Tooltip } from "antd";

const EditCourseButton = () => {
	return(
		<>
			<Tooltip title={"Edit basic course setting"}>
				<EditOutlined
					style={{fontSize: "20px"}}
				/>
			</Tooltip>
		</>
	);
};

export default EditCourseButton;