import { Button, Modal, message } from "antd";
import {usePackageContext} from "../../../Context";
import { useState } from "react";

const DeletePackageButton = () => {
	const [open, setOpen] = useState(false);
	const {onDelete, selectedRows} = usePackageContext();
	const [loading, setLoading] = useState(false);

	const onClick = () => {
		if(selectedRows && selectedRows.length === 0){
			message.error("Please select at least one package");
		}else{
			setOpen(true);
		}
	};

	const handleOk = async () => {
		setLoading(true);
		await onDelete(selectedRows);
		setLoading(false);
		setOpen(false);
	};	

	return (
		<>
			<Button type="primary" danger 
				onClick={onClick}
			>Delete Package</Button>
			<Modal title="Are you sure you want to delete the selected packages?"
				content="This action cannot be undone."
				open={open}
				confirmLoading={loading}
				onOk={handleOk}
				onCancel={() => setOpen(false)}
			/>
		</>
	);
};

export default DeletePackageButton;