import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import { useReturnRecordContext } from "../../../ReturnRecordContext";
import { useState } from "react";

const ReturnEquipment = () => {
	const {selectedRows, onReturnAllEquipment}= useReturnRecordContext();
	const [open, setOpen] = useState(false);
	const[loading, setLoading] = useState(false);

	const onClick = () => {
		if (selectedRows && selectedRows.length >0) {
			setOpen(true);
		} else {
			message.error("Please select at least one record to return");
		}
	};

	const onCancel = () => {
		setOpen(false);
	};

	const onOk = async() => {
		setLoading(true);
		await onReturnAllEquipment();
		setLoading(false);
		onCancel();
	};

	return (
		<>
			<Button type='primary' onClick={onClick}>Return All</Button>
			<Modal 
				title={<><ExclamationCircleFilled 
					style={{color: "#faad14", marginRight: "10px"}}
				/>{" Return All Equipment"}</>}
				icon={<ExclamationCircleFilled />}
				open={open}
				onCancel={onCancel}
				onOk={onOk}
				confirmLoading={loading}
			>
				{"Are you sure to return all equipment?"}
			</Modal>
		</>
	);
};

export default ReturnEquipment;

