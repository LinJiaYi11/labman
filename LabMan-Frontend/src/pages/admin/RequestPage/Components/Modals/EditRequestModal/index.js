import {Modal, Form} from "antd";
import { useRequestRecordContext } from "../../../Context";
import ModifyRequestForm from "../../Forms/ModifyRequestForm";
import { useState } from "react";

const EditRequestModal = ({open, hideModal}) => {
	const {onEdit} = useRequestRecordContext();
	const [loading, setLoading] = useState(false);
	const [form]=Form.useForm();

	const onOk=async() => {
		setLoading(true);
		await form.validateFields();
		const values = form.getFieldsValue();
		values.return_date = values.return_date.format("YYYY-MM-DD HH:mm:ss");
		await onEdit(values);
		setLoading(false);
		closeModal();
	};

	const closeModal = () => {
		form.resetFields();
		hideModal();
	};

	return (
		<Modal
			title="Request Detail"
			open={open}
			onCancel={closeModal}
			onOk={onOk}
			maskStyle={{backgroundColor: "rgba(0,0,0,0.1)"}}
			confirmLoading={loading}
			destroyOnClose={true}
		>
			<ModifyRequestForm form={form}/>
		</Modal>
	);
};

export default EditRequestModal;
