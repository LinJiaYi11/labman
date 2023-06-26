import { Modal,Badge, Descriptions,Button } from "antd";
import { useReturnRecordContext } from "../../../ReturnRecordContext";
import { useEffect, useState } from "react";
import "./style.css"; 


const ShowDetailModal = () => {
	const { modalVisible, setModalVisible , modalData,} = useReturnRecordContext();

	const [descriptionData, setDescriptionData] = useState({});

	useEffect(() => {
		if (modalData) {
			setDescriptionData({
				"Student ID": modalData.student_id,
				"Equipment Name": modalData.type_name,
				"Amount": modalData.borrow_amount,
				"Borrow Time": formatDate(modalData.borrow_date),
				"Due Time": formatDate(modalData.return_date),
				"Actual Return Time": modalData.actual_return_date? formatDate(modalData.actual_return_date):<Badge status="processing" text="Not Returned"/>,
			});
		}
	}, [modalData]);

	const hideModal = () => {
		setModalVisible(false);
	};

	const formatDate = (dateValue) => {
		const date= new Date(dateValue);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return `${year}-${month}-${day}`;
	};

	return (
		<Modal 
			open= {modalVisible}
			onOk={hideModal} 
			onCancel={hideModal}
			footer={[
				<Button key="submit" type="primary" onClick={hideModal}>
				OK
				</Button>,
				<Button key="cancel" className="hide-cancel-button" onClick={hideModal}>
				Cancel
				</Button>,
			]}
			maskStyle={{backgroundColor: "rgba(0,0,0,0.3)"}}
		>
			<Descriptions title='Borrow Record Details' >
				<Descriptions.Item label="Student ID" span={3}>
					{descriptionData["Student ID"]}
				</Descriptions.Item>
				<Descriptions.Item label="Equipment Name" span={3}>
					{descriptionData["Equipment Name"]}
				</Descriptions.Item>
				<Descriptions.Item label="Amount" span={3}>
					{descriptionData["Amount"]}
				</Descriptions.Item>
				<Descriptions.Item label="Borrow Time" span={3}>
					{descriptionData["Borrow Time"]}
				</Descriptions.Item>
				<Descriptions.Item label="Due Time" span={3}>
					{descriptionData["Due Time"]}
				</Descriptions.Item>
				<Descriptions.Item label="Actual Return Time" span={3}>
					{descriptionData["Actual Return Time"]}
				</Descriptions.Item>
			</Descriptions>
		</Modal>
	);
};

export default ShowDetailModal;