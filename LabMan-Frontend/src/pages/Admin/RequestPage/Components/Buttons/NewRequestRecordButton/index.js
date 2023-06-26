import { Button, Modal, Form, message } from "antd";
import { useState } from "react";
import NewRequestRecordForm from "../../Forms/NewRequestRecordForm";
import { useRequestRecordContext } from "../../../Context";

const NewRequestRecordButton = () => {
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { onAdd} = useRequestRecordContext();
	const showModal = () => {
		setIsModalOpen(true);
	};
	const hideModal = () => {
		form.resetFields();
		setIsModalOpen(false);
	};

	const [form] = Form.useForm();

	const okHandler = async () => {
		setLoading(true);
		try {
			const values = await form.validateFields();
			await onAdd(values);
			hideModal();
		} catch (error) {
			message.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
        New
			</Button>
			<Modal
				title="Add New Request Record"
				open={isModalOpen}
				onCancel={hideModal}
				onOk={okHandler}
				destroyOnClose={true}
				maskStyle={{ backgroundColor: "rgba(0,0,0,0.3)" }}
				confirmLoading={loading}
			>
				<NewRequestRecordForm form={form} />
			</Modal>
		</>
	);
};

export default NewRequestRecordButton;
