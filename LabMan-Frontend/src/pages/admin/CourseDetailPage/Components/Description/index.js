import { Descriptions,Spin } from "antd";
import { useCourseDetailContext } from "../../Context";
import CourseName from "../Paragraph/Coursename";
import CoordinatorName from "../Paragraph/CoordinatorName";
import { useEffect } from "react";
import DueDate from "../Paragraph/DueDate";

const CourseDescription = () => {
	const { course_id, fetchCourse, loading, onStudentListClick, onPackageListClick } = useCourseDetailContext();

	useEffect(() => {
		fetchCourse();
		console.log("fetchCourse");
	}, []);

	return(
		<>
			<Spin spinning={loading}/>
			<Descriptions bordered column={2}>
				<Descriptions.Item label="Course Code" span={2}>{course_id}</Descriptions.Item>
				<Descriptions.Item label="Course Title" span={2}><CourseName/></Descriptions.Item>
				<Descriptions.Item label="Course Coordinator" span={2}>{<CoordinatorName/>}</Descriptions.Item>
				<Descriptions.Item label="Course Due Date" span={2}><DueDate/></Descriptions.Item>
				<Descriptions.Item label="Enrolled Students" span={2}>
					<a onClick={onStudentListClick}>Student List</a>
				</Descriptions.Item>
				<Descriptions.Item label="Entitled Packages" span={2}>
					<a onClick={onPackageListClick}>Package List</a>
				</Descriptions.Item>
			</Descriptions>
		</>
	);
};

export default CourseDescription;
