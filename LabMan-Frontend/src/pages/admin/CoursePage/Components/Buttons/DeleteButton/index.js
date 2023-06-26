import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import { useCourseContext } from "../../../Context";
import { useState } from "react";

const DeleteButton = () => {
	const { onDelete, selectedRows } = useCourseContext();
	const [visible, setVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const onClick = () => {
		if (selectedRows && selectedRows.length > 0) {
			console.log("selectedRows:", selectedRows);
			setVisible(true);
		} else {
			message.warning("Please select at least one row.");
		}
	};

	const onOk = async () => {
		setConfirmLoading(true);
		await onDelete();
		setConfirmLoading(false);
		setVisible(false);
	};

	return (
		<>
			<Button
				type="primary"
				danger
				onClick={onClick}
			>Delete</Button>
			<Modal
				title="Do you want to delete the course(s)?"
				icon={<ExclamationCircleFilled />}
				open={visible}
				onOk={onOk}
				confirmLoading={confirmLoading}
				onCancel={() => setVisible(false)}
			/>
		</>
	);
};

export default DeleteButton;