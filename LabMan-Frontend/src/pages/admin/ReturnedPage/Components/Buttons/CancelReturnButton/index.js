import { useReturnedRecordContext } from "../../../Context";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import { useState } from "react";

function CancelAllReturnButton() {
	const { selectedRows, onCancelAll } = useReturnedRecordContext();
	const [open, setOpen] = useState(false);
  
	const handleCancel = () => {
		if (selectedRows && selectedRows.length > 0) {
			setOpen(true);
		} else {
			message.warning("Please select at least one row.");
		}
	};
	
	const closeModal = () => {
		setOpen(false);
	};

	const [confirmLoading, setConfirmLoading] = useState(false);

	const onOk = async () => {
		setConfirmLoading(true);
		await onCancelAll();
		setConfirmLoading(false);
		closeModal();
	};
  
	return (
		<>
			<Button type={"primary"} onClick={handleCancel}>
		Cancel All
			</Button>
			<Modal
				title="Do you want to cancel the return record?"
				icon={<ExclamationCircleFilled />}
				open={open}
				onCancel={closeModal}
				confirmLoading={confirmLoading}
				destroyOnClose={true}
				onOk={onOk}
			/>
		</>
	);
}
  
export default CancelAllReturnButton;
  