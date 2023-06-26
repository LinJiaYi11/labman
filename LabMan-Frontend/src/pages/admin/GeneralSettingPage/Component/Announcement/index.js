import { getAnnouncement, editAnnouncement } from "../../../../../api/announcement";
import { useState, useEffect } from "react";
import { message,  Modal, Form, Input, Row, Space } from "antd";
import {EditOutlined} from "@ant-design/icons";

const Announcement = () => {
	const [text, setText] = useState("");
	const [visible, setVisible] = useState(false);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const getText = async () => {
		try {
			const response = await getAnnouncement();
			setText(response.announcement);
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		getText();
	}, []);

	useEffect(() => {
		form.setFieldsValue({
			announcement: text,
		});
	}, [text]);
    
	const onOk = async () => {
		setLoading(true);
		const values = await form.validateFields();
		console.log(values);
		try{
			await editAnnouncement(values);
			message.success("Announcement updated");
			setVisible(false);
			getText();
		}catch(error){
			message.error(error.message);
		}
		setLoading(false);
	};


	return (
		<>
			<Row justify={"center"}>
				<Space>
					<p>{text}</p>
					<EditOutlined onClick={() => setVisible(true)}/>
				</Space>
			</Row>
			<Modal
				title="Edit Announcement"
				open={visible}
				onCancel={() => setVisible(false)}
				onOk={onOk}
				confirmLoading={loading}
			>
				<Form form={form}>
					<Form.Item name={"announcement"}>
						<Input.TextArea
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Announcement;

