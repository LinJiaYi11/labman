import { Modal, Form } from "antd";
import { useState } from "react";
import EditPackageForm from "../../Forms/EditPackageForm";

const EditPackageModal = ({open, hideModal, record}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const closeModal = () => {
		form.resetFields();
		hideModal();
	};

	const onOk = async() => {
		setLoading(true);
		const values=await form.validateFields();
		console.log(values);
		setLoading(false);
		closeModal();
	};

	return (
		<Modal 
			title={"Edit Course Package"}
			open={open}
			onCancel={closeModal}
			confirmLoading={loading}
			onOk={onOk}
			destroyOnClose={true}
		>
			<EditPackageForm form={form} record={record}/>
		</Modal>
	);
};

export default EditPackageModal;