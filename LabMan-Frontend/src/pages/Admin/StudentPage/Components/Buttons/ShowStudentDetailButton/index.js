import { Button,Modal,message } from "antd";
import {useState} from "react";
import {useStudentContext} from "../../../Context/StudentContext";

function ShowStudentDetailButton() {
	const [messageApi, contextHolder] = message.useMessage();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {selectedRows} = useStudentContext();

	const onClick = () => {
		if(selectedRows && selectedRows.length === 1){
			showModal();
		}else if(selectedRows && selectedRows.length > 1){
			messageApi.warning("Please select only one row.");
		}
		else{
			messageApi.warning("Please select at least one row.");
		}
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const hideModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			{contextHolder}
			<Button onClick={onClick} >
            Detail
			</Button>
			<Modal title="Student Detail" width="70vw" open={isModalOpen} onCancel={hideModal} onOk={hideModal}>
				<p>Student ID: {selectedRows?selectedRows[0].student_id:""}</p>
				<p>Student Email: {selectedRows?selectedRows[0].email:""}</p>
				{/* <p>Student Password: {selectedRows?selectedRows[0].password:""}</p> */}
			</Modal>
		</>
		
	);
}


export default ShowStudentDetailButton;