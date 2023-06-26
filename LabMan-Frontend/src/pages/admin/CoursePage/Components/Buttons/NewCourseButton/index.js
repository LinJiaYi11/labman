import { Button, Modal, Form } from "antd";
import { useState } from "react";
import {useCourseContext} from "../../../Context";
import NewCourseForm from "../../Forms/NewCourseForm";

const NewCourseButton = () => {
	const {onAdd}=useCourseContext();
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onClick = () => {
		setOpen(true);
	};

	const hideModal = () => {
		form.resetFields();
		setOpen(false);
	};
    
	const onOk = async() => {
		setLoading(true);
		const values = await form.validateFields();
		values.due_date = values.due_date.format("YYYY-MM-DD HH:mm:ss");
		console.log(values);
		await onAdd(values);
		setLoading(false);
		hideModal();
	};

	return(
		<>
			<Button 
				type='primary'
				onClick={onClick}
			>New </Button>
			<Modal title="Add New Course"
				open={open}
				onOk={onOk}
				onCancel={hideModal}
				destroyOnClose={true}
				confirmLoading={loading}
			>
				<NewCourseForm form={form}/>
			</Modal>
		</>
	);
};

export default NewCourseButton;