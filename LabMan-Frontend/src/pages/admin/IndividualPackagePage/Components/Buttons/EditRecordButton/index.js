import { EditOutlined } from "@ant-design/icons";
import { Modal, Form } from "antd";
import { useState } from "react";
import EditEquipmentForm from "../../Form/EditEquipmentForm";
import { usePackageDetailContext } from "../../../Context";

const EditRecordButton = ({ record}) => {
	const [form] = Form.useForm();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { onEdit } = usePackageDetailContext();

	const onClick = () => {
		setOpen(true);
		form.setFieldValue("type_id", record.type_id);
		form.setFieldValue("upper_bound_amount", record.upper_bound_amount);
		form.setFieldValue("type_name", record.type_name);
	};

	const hideModal = () => {
		form.resetFields();
		setOpen(false);
	};

	const onOk = async() => {
		setLoading(true);
		const values = await form.validateFields();
		await onEdit(values);
		hideModal();
		setLoading(false);
	};


	return (
		<>
			<EditOutlined 
				onClick={onClick}
			/>
			<Modal 
				title="Edit Amount"
				open={open}
				onCancel={hideModal}
				onOk={onOk}
				destroyOnClose={true}
				confirmLoading={loading}
			>
				<EditEquipmentForm record={record} form={form} />
			</Modal>
		</>
	);
};

export default EditRecordButton;