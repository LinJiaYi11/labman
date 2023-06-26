import { Button,Modal,Form, message } from "antd";
import {useState} from "react";
import {useStudentContext} from "../../../Context/StudentContext";
import ModifyStudentForm from "../../Forms/ModifyStudentForm";

function ModifyStudentButton() {
	const [messageApi, contextHolder] = message.useMessage();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [form] = Form.useForm();

	const {selectedRows, onModify} = useStudentContext();

	const onModifyClick = () => {
		if(selectedRows && selectedRows.length === 1){
			showModal();
		}else if(selectedRows && selectedRows.length > 1){
			messageApi.warning("Please select only one row.");
		}
		else{
			messageApi.warning("Please select at least one row.");
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
			<Button onClick={onModifyClick} >
            Modify
			</Button>
			<Modal title="Modify Student" width="70vw" open={isModalOpen} onCancel={hideModal} onOk={okHandler}>
				<ModifyStudentForm form={form}/>
			</Modal>
		</>
		
	);
}


export default ModifyStudentButton;