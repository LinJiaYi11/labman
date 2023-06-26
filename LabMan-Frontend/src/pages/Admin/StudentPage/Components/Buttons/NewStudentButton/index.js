import { Button,Modal,Form } from "antd";
import {useState} from "react";
import {useStudentContext} from "../../../Context/StudentContext";
import NewStudentForm from "../../Forms/NewStudentForm";

const NewStudentButton = () => {
	const {onAdd}=useStudentContext();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [form] = Form.useForm();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const hideModal = () => {		
		form.resetFields();
		setIsModalOpen(false);
	};

	const okHandler = async() => {
		try {
			const values = await form.validateFields();
			onAdd(values);
			hideModal();
		} catch (error) {
			console.log("Form validation failed:", error);
		}
	};

	return (
		<>
			<Button type='primary' onClick={showModal}>New </Button>

			<Modal title='Add New Student' width="70vw" open={isModalOpen} onCancel={hideModal} onOk={okHandler}>
				<NewStudentForm form={form}/>
			</Modal>
		</>
	);
};

export default NewStudentButton;