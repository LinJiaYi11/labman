import { Descriptions } from "antd";

const RequestLogDescription = ({data}) => {
	const getStatus = (status) => {
		if (status === 0) {
			return "Generated";
		}else if (status === 1) {
			return "Collected";
		}else if (status === 2) {
			return "Edit";
		}else if (status === 3) {
			return "Cancelled";
		}
	};

	const getTime = (time) => {
		const date = new Date(time);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
        
		return `${year}-${month}-${day}`;
	};
    
	return (
		<Descriptions title="Request Log Detail" column={3}>
			<Descriptions.Item label="Student ID" span={3}>{data.student_id}</Descriptions.Item>
			<Descriptions.Item label="Equipment Name" span={2}>{data.type_name}</Descriptions.Item>
			<Descriptions.Item label="Borrow Amount"span={1}>{data.borrow_amount}</Descriptions.Item>
			<Descriptions.Item label="Due Day" span={2}>{getTime(data.return_date)}</Descriptions.Item>
			<Descriptions.Item label="Action" span={1}>{getStatus(data.log_type)}</Descriptions.Item>
			<Descriptions.Item label="Time" span={3}>{getTime(data.log_time)}</Descriptions.Item>
			{(data.log_type === 3) &&<Descriptions.Item label="Cancel Reason" span={3}>{data.cancel_reason}</Descriptions.Item>
			}
		</Descriptions>
	);
};

export default RequestLogDescription;