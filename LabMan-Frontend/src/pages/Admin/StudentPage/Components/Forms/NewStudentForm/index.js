import { Form, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getStudentById } from "../../../../../../api/student";
import { message } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";

function NewStudentForm({ form }) {
	const studentValidator = async (_, value) => {
		if (/^a\d{7}$/.test(value)) {
			try {
				await getStudentById(value);
				return Promise.reject(new Error("Student ID already exists!"));
			} catch (err) {
				return Promise.resolve();
			}
		} else {
			return Promise.reject(
				new Error("Student ID must start with 'a' and followed by 7 digits")
			);
		}
	};	

	return (
		<Form form={form}>
			<Form.List name={"student_ids"}>
				{(fields, {add, remove}) => {
					return (
						<>
							{fields.map((field) => (
								<Form.Item
									label={"Student ID"}
									required={false}
									key={field.key}
								>
									<Form.Item
										{...field}
										validateTrigger={["onChange", "onBlur"]}
										rules={[
											{
												required: true,
												whitespace: true,
												message: "Please input student ID or delete this field.",
											},
											{
												validator: studentValidator,
											}
										]}
										noStyle
									>
										<Input placeholder="Student ID" style={{width: "60%"}}/>
									</Form.Item>
									{fields.length > 1 ? (
										<MinusCircleOutlined
											className="dynamic-delete-button"
											onClick={() => remove(field.name)}
										/>
									) : null}
								</Form.Item>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => add()}  
									style={{width: "60%"}}
									icon={<PlusOutlined/>}
								>
                                    Add Student
								</Button>
							</Form.Item>
							<Form.Item>
								<Upload 
									{
										...{
											name: "file",
											action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
											headers: {
												authorization: "authorization-text",
											},
											onChange(info) {
												if (info.file.status !== "uploading") {
													console.log(info.file, info.fileList);
												}
												if (info.file.status === "done") {
													message.success(`${info.file.name} file uploaded successfully`);
													Papa.parse(info.file.originFileObj, {
														complete: function(results) {
															const student_id = results.data
																.filter((row) => /^a\d{7}$/.test(row[0]))
																.map((row) => row[0]);

															form.setFieldValue("student_ids", student_id);
															
														}
													});
												} else if (info.file.status === "error") {
													message.error(`${info.file.name} file upload failed.`);
												}											
											},
											accept: ".csv",
										}
									}									
								>
									<Button icon={<UploadOutlined/>}>Import Students</Button>
								</Upload>
							</Form.Item>
						</>
					);
				}}
			</Form.List>            
		</Form>
	);
}

export default NewStudentForm;