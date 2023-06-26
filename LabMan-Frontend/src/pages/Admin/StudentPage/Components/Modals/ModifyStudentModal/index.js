import { Modal,Form, message } from "antd";
import { useStudentContext } from "../../../Context/StudentContext";
import ModifyStudentForm from "../../Forms/ModifyStudentForm";

function ModifyStudentModal() {
	const { modifyModalVisible,
		setModifyModalVisible,
		modalData,
		setModalData,
		onModify} = useStudentContext();

	const [form] = Form.useForm();

	const hideModifyModal = () => {
		setModifyModalVisible(false);
		setModalData(null);
	};

	const handleModify = async() => {
		try {
			const values = await form.validateFields();
			values.student_id=modalData.student_id;
			values.email=values.student_id+"@adelaide.edu.au";
			onModify(values);
			hideModifyModal();
			form.resetFields();
		} catch (error) {
			message.error(error.message);
		}
	};

	return (
		<Modal title="Modify Student" width="70vw" open={modifyModalVisible} onCancel={hideModifyModal} onOk={handleModify}>
			<ModifyStudentForm form={form}/>
		</Modal>
	);
}

export default ModifyStudentModal;