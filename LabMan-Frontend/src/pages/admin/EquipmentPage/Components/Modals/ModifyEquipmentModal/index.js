import { Modal,Form } from "antd";
import { useEquipmentContext } from "../../../Context";
import ModifyEquipmentForm from "../../Forms/ModifyEquipmentForm";

const ModifyEquipmentModal=({open, modalData, hideModal}) =>{
	const { onModify} = useEquipmentContext();

	const [form] = Form.useForm();

	const handleModify = async() => {
		try {
			const values = await form.validateFields();
			console.log("Form values:", values);
			values.type_id=modalData.type_id;
			onModify(values);
			hideModal();
			form.resetFields();
		} catch (error) {
			console.log("Form validation failed:", error);
		}
	};

	return (
		<Modal
			title="Modify Equipment" 
			width="40vw" 
			open={open} 
			onCancel={hideModal} 
			onOk={handleModify}
			maskStyle={{backgroundColor:"rgba(0,0,0,0.1)"}}
			destroyOnClose={true}
		>
			<ModifyEquipmentForm form={form} modalData={modalData}/>
		</Modal>
	);
};

export default ModifyEquipmentModal;