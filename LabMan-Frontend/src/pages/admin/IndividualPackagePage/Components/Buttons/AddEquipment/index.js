import { Button, Modal, Form } from "antd";
import { useState } from "react";
import AddEquipmentForm from "../../Form/AddEquipmentForm";
import { usePackageDetailContext } from "../../../Context";

const AddEquipmentButton = () => {
	const { onAdd } = usePackageDetailContext();
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false); 
	const onClick = () => {
		setOpen(true);
	};

	const hideModal = () => {
		form.resetFields();
		setOpen(false);
	};

	const onOk =async () => {
		setLoading(true);
		const values= await form.validateFields();
		await onAdd(values);
		hideModal();
		setLoading(false);
	};

	return (
		<>
			<Button type="primary" onClick={onClick}>
            Add Equipment
			</Button>
			<Modal title="Add Equipment" 
				open={open} 
				onCancel={hideModal}
				onOk={onOk}
				destroyOnClose={true}
				confirmLoading={loading}
			>
				<AddEquipmentForm form={form} />
			</Modal>
		</>
	);
};

export default AddEquipmentButton;