import { Button, Modal, Form } from "antd";
import AddStudentForm from "../../Forms/AddStudentForm";
import { useState } from "react";
import { useStudentListContext } from "../../../Context";

const AddStudentButton = () => {
	const [form] = Form.useForm();
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const {onAdd}=useStudentListContext();
	const onClick = () => {
		setOpen(true);
	};
	const hideModal = () => {
		form.resetFields();
		setOpen(false);
	};

	const handleOk = async () =>{
		setConfirmLoading(true);
		try{
			const data=await form.validateFields();
			await onAdd(data);
			hideModal();
		}catch(err){
			console.log(err);
		}
		setConfirmLoading(false);
	};

	return (
		<>
			<Button type="primary" onClick={onClick}>
                Add
			</Button>
			<Modal 
				title={"Add Student"}
				destroyOnClose={true}
				open={open}
				onOk={handleOk}
				onCancel={hideModal}
				confirmLoading={confirmLoading}
			>
				<AddStudentForm form={form}/>
			</Modal>
		</>
	);
};

export default AddStudentButton;