import { Button,Modal,Form, message } from "antd";
import {useState} from "react";
import {useEquipmentContext} from "../../../Context";
import ModifyEquipmentForm from "../../Forms/ModifyEquipmentForm";

function ModifyEquipmentButton() {
	const [messageApi, contextHolder] = message.useMessage();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [form] = Form.useForm();

	const {selectedRows, onModify} = useEquipmentContext();

	const onModifyClick = () => {
		if(selectedRows&&selectedRows.length==1){
			showModal();
		}
		else if(selectedRows&&selectedRows.length>1){
			messageApi.warning("Please select only one row.");
		}
		else{
			messageApi.warning("Please select a row.");
		}
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const hideModal = () => {
		setIsModalOpen(false);
	};

	const okHandler = async() => {
		try {
			const values = await form.validateFields();
			console.log("Form values:", values);
			onModify(values);
			hideModal();
			form.resetFields();
		} catch (error) {
			console.log("Form validation failed:", error);
		}
	};



	return (
		<>
			{contextHolder}
			<Button type="primary" onClick={onModifyClick} >
            Modify
			</Button>
			<Modal title="Modify Equipment" width="70vw" open={isModalOpen} onCancel={hideModal} onOk={okHandler}>
				<ModifyEquipmentForm form={form}/>
			</Modal>
		</>
		
	);
}


export default ModifyEquipmentButton;