import { useRequestRecordContext } from "../../../Context";
import { Button, Modal, message, Form, Input } from "antd";
import { useState } from "react";

function CancelRequestRecordButton() {
	const { selectedRows, onCancelRequest } = useRequestRecordContext();
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [form] = Form.useForm();
  
	const handleCancel = () => {
		if (selectedRows && selectedRows.length > 0) {
			setVisible(true);
		} else {
			message.warning("Please select at least one row.");
		}
	};
	
	const handleOk = async () => {
		setLoading(true);
		try {
			const values = await form.validateFields();
			values.cancel_reason=values.cancel_reason.trim() +"(by Admin)";
			await onCancelRequest(values);
			setVisible(false);
		} catch (error) {
			message.error(error.message);
		}
		setLoading(false);
	};

	const onCancel = () => {
		form.resetFields();
		setVisible(false);
	};

	return (
		<>
			<Button onClick={handleCancel}>
		Cancel
			</Button>
			<Modal
				open={visible}
				confirmLoading={loading}
				onOk={handleOk}
				onCancel={onCancel}
			>
				<Form form={form}>
					<Form.Item
						label="Cancel Reason"
						name="cancel_reason"
					>
						<Input.TextArea />
					</Form.Item>

				</Form>
			</Modal>
		</>

	);
}
  
export default CancelRequestRecordButton;
  