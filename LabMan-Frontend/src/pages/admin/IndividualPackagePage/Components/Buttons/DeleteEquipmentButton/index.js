import { Button, Modal, message } from "antd";
import { useState } from "react";
import { usePackageDetailContext } from "../../../Context";
import { ExclamationCircleFilled } from "@ant-design/icons";

const DeleteEquipmentButton = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { onDelete, selectedRows } = usePackageDetailContext();

	const onClick = () => {
		if(selectedRows && selectedRows.length > 0) {
			setOpen(true);
		}else {
			message.error("Please select at least one package");
		}
	};

	const hideModal = () => {
		setOpen(false);
	};

	const onOk = async() => {
		setLoading(true);
		await onDelete();
		hideModal();
		setLoading(false);
	};

	return (
		<>
			<Button type="primary" danger onClick={onClick}>
                Delete
			</Button>
			<Modal title="Delete Equipment"
				content="Are you sure you want to delete the selected equipment?"
				icon={<ExclamationCircleFilled />}
				open={open}
				onCancel={hideModal}
				onOk={onOk}
				destroyOnClose={true}
				confirmLoading={loading}
			/>
		</>
	);
};

export default DeleteEquipmentButton;