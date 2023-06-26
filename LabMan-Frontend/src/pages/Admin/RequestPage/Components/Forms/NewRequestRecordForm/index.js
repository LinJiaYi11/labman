import { Form, Input, InputNumber, message, Select} from "antd";
import { useEffect, useState } from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { getCourseListByStudentId } from "../../../../../../api/enrollment";
import { getPackages, getPackageById } from "../../../../../../api/package";
import { getEquipmentByTypename } from "../../../../../../api/equipment";
import { getStudentById } from "../../../../../../api/student";

function NewRequestRecordForm({ form }) {
	const[courseList, setCourseList] = useState([]);
	const[packageList, setPackageList] = useState([]);
	const course_id=Form.useWatch("course_id", form);
	const package_id=Form.useWatch("package_id", form);

	const getCourseList = async () => {
		const student_id=form.getFieldValue("student_id");
		try{
			const response = await getCourseListByStudentId(student_id);
			setCourseList(response);
		}catch(error){
			if(error.response.status===404){
				message.error("Student has not enrolled in any course!");
			}else{
				message.error(error.message);
			}
		}
	};

	const getPackageList = async (course_id) => {
		try{
			const response = await getPackages(course_id);
			setPackageList(response);
		}catch(error){
			if(error.response.status===404){
				message.error("Course has no package!");
			}else{
				message.error(error.message);
			}
		}
	};

	const getPackageDetail = async(package_id) => {
		try{
			const response = await getPackageById(package_id);
			form.setFieldsValue({
				"request_items": response
			});
		}catch(error){
			if(error.response.status===404){
				message.error("Package includes no equipment!");
			}else{
				message.error(error.response.error);
			}
		}
	};

	const getAvailableAmount = async (typename) => {
		try{
			const response = await getEquipmentByTypename(typename);
			return response[0].available_amount;
		}catch(error){
			message.error(error.message);
		}
	};

	useEffect(() => {
		const student_id=form.getFieldValue("student_id");
		if(student_id){
			getCourseList();
		}
	}, [form]);

	useEffect(() => {
		if(course_id){
			getPackageList(course_id);
		}
	}, [course_id]);

	useEffect(() => {
		if(package_id){
			getPackageDetail(package_id);
		}
	}, [package_id]);

	const validateStudentID = async(_, value) => {
		if (/^a\d{7}$/.test(value) ) {
			try{
				const response = await getStudentById(value);
				if(response){
					getCourseList();
					return Promise.resolve();
				}
			}catch(error){
				return Promise.reject(
					new Error("Student ID does not exist!")
				);
			}
		} else {
			return Promise.reject(
				new Error("Student ID must start with 'a' and followed by 7 digits")
			);
		}
	};

	return (
		<Form form={form} layout="vertical">
			<Form.Item 
				label="Student ID" 
				name="student_id" 
				rules={[
					{ required: true },
					{ validator: validateStudentID },
				]}>
				<Input />
			</Form.Item>
			<Form.Item name={"course_id"} label="Course" rules={[{ required: true }]}>
				<Select
					showSearch
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					options={courseList.map((courseList) => ({
						label: courseList.course_name,
						value: courseList.course_id,
					}))}
				/>
			</Form.Item>
			<Form.Item name={"package_id"} label="Package" rules={[{ required: true }]}>
				<Select
					showSearch
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					options={packageList.map((packageList) => ({
						label: packageList.package_name,
						value: packageList.package_id,
					}))}
				/>
			</Form.Item>
			<Form.List name="request_items">
				{(fields, { remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<div key={key} >
								
								<Form.Item
									{...restField}
									label="Equipment Type"
									name={[name, "type_name"]}
									hidden={true}
									key={"type_name"+key}
								/>
								<Form.Item
									{...restField}
									label="Equipment ID"
									name={[name, "type_id"]}
									hidden={true}
									key={"type_id"+key}
								/>
								<Form.Item 
									{...restField}
									name={[name, "upper_bound_amount"]}
									hidden={true}
									key={"upper_bound_amount"+key}
								/>
								<Form.Item
									{...restField}
									label={form.getFieldValue(["request_items", key, "type_name"])+" Amount"}
									name={[name, "borrow_amount"]}
									key={"request_amount"+key}
									rules={[
										{ required: true },
										{ validator: async(_, value) => {
											const upper_bound_amount=form.getFieldValue(["request_items", key, "upper_bound_amount"]);
											const typename=form.getFieldValue(["request_items", key, "type_name"]);
											const available_amount= await getAvailableAmount(typename);
											if(value>upper_bound_amount){
												return Promise.reject(
													new Error("Amount exceeds upper bound("+upper_bound_amount+")!")
												);
											}else if(value>available_amount){
												return Promise.reject(
													new Error("Amount exceeds available amount("+available_amount+")!")
												);
											}else if(value<=0){
												return Promise.reject(
													new Error("Amount must be positive!")
												);
											}else{
												return Promise.resolve();
											}
										}},
									]}
								>
									<div 
										style={{
											display: "flex",
											alignItems: "center",
										}}
									>
										<InputNumber />
										<MinusCircleOutlined 
											style={{
												marginLeft: "10px",
											}}
		
											onClick={() => remove(name)} />
									</div>
								</Form.Item>
								
								
								
							</div>
						))}
					</>
				)}
			</Form.List>
		</Form>
	);
}

export default NewRequestRecordForm;
