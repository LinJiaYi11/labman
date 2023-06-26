import { Badge, Descriptions } from "antd";
import { useRequestRecordContext } from "../../Context";

const RequestDescription = () => {
	const {modalData} = useRequestRecordContext();

	return(
		<Descriptions title="Request Detail" bordered>
			<Descriptions.Item label="Request Time">{modalData?modalData.request_time:""}</Descriptions.Item>
			<Descriptions.Item label="Equipment Name">{modalData?modalData.type_name:""}</Descriptions.Item>
			<Descriptions.Item label="Student ID">{modalData?modalData.student_id:""}</Descriptions.Item>
			<Descriptions.Item label="Amount">{modalData?modalData.borrow_amount:""}</Descriptions.Item>
			<Descriptions.Item label="Status">
				<Badge status={modalData?modalData.request_status===0?"processing":modalData.request_status===1?"success":"error":""} text={modalData?modalData.request_status===0?"Pending":modalData.request_status===1?"Collected":"Cancelled":""} />
			</Descriptions.Item>
		</Descriptions>
	);
};

export default RequestDescription;