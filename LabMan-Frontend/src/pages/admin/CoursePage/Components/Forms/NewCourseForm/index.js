import {DatePicker, Form, Input} from "antd";
import { getCourseById, getCourseByCoursenameAndCoordinator } from "../../../../../../api/course";
import moment from "moment";

const NewCourseForm = ({ form}) => {
	const courseCodeValidator = async(_, value) => {
		try{
			await getCourseById(value);
			return Promise.reject("Course code already exists.");
		}catch(error){
			return Promise.resolve();
		}
	};

	const courseNameValidator = async(_, value) => {
		try{
			await getCourseByCoursenameAndCoordinator(value, form.getFieldValue("course_coordinator"));
			return Promise.reject("Course name already exists.");
		}catch(error){
			return Promise.resolve();
		}
	};

	return(
		<>
			<Form form={form}>
				<Form.Item label="Course Code" name="course_id" rules={
					[
						{
							required: true,
							message: "Please input course code.",
						},
						{
							validator:courseCodeValidator,
						}
					]
				}>
					<Input />
				</Form.Item>
				<Form.Item label="Course Title" name="course_name" rules={
					[
						{
							required: true,
							message: "Please input course title.",
						},
						{
							validator:courseNameValidator,
						}
					]
				}>
					<Input />
				</Form.Item>
				<Form.Item label="Course Coordinator" name="coordinator_name">
					<Input />
				</Form.Item>
				<Form.Item label="Equipment Return Date" name="due_date"
					rules={
						[
							{
								required: true,
								message: "Please input return date.",
							},
						]
					}
				>
					<DatePicker 
						allowClear
						disabledDate={(current) => {
							return current && current < moment().endOf("day");
						}}
					/>
				</Form.Item>
			</Form>
		</>
	);
};

export default NewCourseForm;