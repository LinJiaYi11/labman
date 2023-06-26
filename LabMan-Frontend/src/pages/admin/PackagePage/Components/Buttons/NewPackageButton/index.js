import { Button, Modal, Form } from "antd";
import { useState } from "react";
import { usePackageContext } from "../../../Context";
import NewPackageForm from "../../Forms/NewPackageForm";

const NewPackageButton = () => {
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();
	const {onAdd} = usePackageContext();

	const onClick = () => {
		setOpen(true);
	};

	const hideModal = () => {
		form.resetFields();
		setOpen(false);
	};

	const onOk = async() => {
		const values = await form.validateFields();
		onAdd(values);
		console.log(values);
		hideModal();
	};

	return (
		<>
			<Button type="primary" onClick={onClick}>New Package</Button>
			<Modal
				title="New Package"
				open={open}
				onCancel={hideModal}
				onOk={onOk}
				destroyOnClose={true}
			>
				<NewPackageForm form={form}/>
			</Modal>
		</>
	);
};

export default NewPackageButton;