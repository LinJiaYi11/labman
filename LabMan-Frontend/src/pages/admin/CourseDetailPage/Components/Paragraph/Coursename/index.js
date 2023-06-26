import { Typography, Modal, message } from "antd";
import { useEffect, useState } from "react";
const { Paragraph } = Typography;
const { confirm } = Modal;
import { useCourseDetailContext } from "../../../Context";

const CourseName = () => {
	const { course_name, changeCourseName } = useCourseDetailContext();
	const [courseName, setCourseName] = useState(course_name);

	const onEnd = () => {
		if(courseName!== course_name){
			if(courseName === ""){
				message.warning("Course name cannot be empty.");
				setCourseName(course_name);
			}else{
				showConfirm();
			}
		}
	};

	useEffect(() => {
		onEnd();
	}, [courseName]);

	useEffect(() => {
		setCourseName(course_name);
	}, [course_name]);

	const showConfirm = () => {
		confirm({
			title: "Do you want to submit the changes?",
			content: "This action cannot be undone.",
			onOk() {
				changeCourseName(courseName);
			},
			onCancel() {
				setCourseName(course_name);
			},
		});
	};

	return(
		<>
			<Paragraph editable={
				{
					onChange: setCourseName,
					onEnd: onEnd,
				}
			}>
				{courseName}
			</Paragraph>
		</>
	);
};

export default CourseName;