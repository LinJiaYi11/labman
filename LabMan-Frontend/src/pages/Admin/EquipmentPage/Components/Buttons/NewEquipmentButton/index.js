import { Button,Modal,Form } from "antd";
import {useState} from "react";
import {useEquipmentContext} from "../../../Context";
import NewEquipmentForm from "../../Forms/NewEquipmentForm";

const NewEquipmentButton = () => {
	const{onAdd}=useEquipmentContext();

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
			values.available_amount=values.total_amount;
			console.log("Form values:", values);
			onAdd(values);
			// call the API to create a new request record here
			hideModal();
			form.resetFields();
		} catch (error) {
			console.log("Form validation failed:", error);
		}
	};

	return (
		<>
			<Button type='primary' onClick={showModal}>New </Button>
			<Modal title='Add New Equipment' width="70vw" open={isModalOpen} onCancel={hideModal} onOk={okHandler}>
				<NewEquipmentForm form={form}/>
			</Modal>
		</>
	);
};

export default NewEquipmentButton;