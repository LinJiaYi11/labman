import { Button, Modal, message } from "antd";
import { useStudentListContext } from "../../../Context";
import { useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const DeleteStudentButton = () => {
	const {selectedRows, onDelete} = useStudentListContext();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const onClick = () => {
		if(selectedRows && selectedRows.length > 0){
			setOpen(true);
		}else{
			message.error("Please select at least one student to delete");
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
			<Button type="primary" danger onClick={onClick}>
                Delete
			</Button>
			<Modal title="Delete enrolled student of the course"
				content="Are you sure you want to delete the selected students?"
				icon={ExclamationCircleOutlined}
				open={open}
				confirmLoading={loading}
				onOk={handleOk}
				onCancel={() => setOpen(false)}
                
			/>
		</>
	);
};

export default DeleteStudentButton;