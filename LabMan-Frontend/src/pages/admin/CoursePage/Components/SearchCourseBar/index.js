import { SearchOutlined } from "@ant-design/icons";
import { Button} from "antd";
import { Input, Space } from "antd";
import { useCourseContext } from "../../Context";
import { useState } from "react";

const SearchCourseBar = () => {
	const [courseName, setCourseName] = useState("");
	const [coordinator, setCoordinator] = useState("");

	const {onSearch} =useCourseContext();

	const onClick = () => {
		onSearch(courseName, coordinator);
	};

	const onCoursenameInputChange = (e) => {
		const trimValue=e.target.value.trim();
		setCourseName(trimValue);
	};

	const onCoordinatorInputChange = (e) => {
		const trimValue=e.target.value.trim();
		setCoordinator(trimValue);
	};

	return (
		<Space>
			<Input 
				onChange={onCoursenameInputChange}
				placeholder="Input Course Name" 
				allowClear
				onPressEnter={onClick}
			/>
			<Input 
				onChange={onCoordinatorInputChange}
				placeholder="Input Course Coordinator" 
				allowClear
				onPressEnter={onClick}
			/>
			<Button 
				type="primary" 
				icon={<SearchOutlined />}
				onClick={onClick}
			>
				Search
			</Button>
		</Space>
	);
};

export default SearchCourseBar;