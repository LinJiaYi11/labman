import { Descriptions } from "antd";

const EquipmentLogDescription = ({data}) => {
	const getStatus = (status) => {
		if (status === "0") {
			return "Borrowed";
		}else if (status === "1") {
			return "Returned";
		}else if (status === "2") {
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
		<Descriptions title={"Equipment Log Detail"} column={3}>
			<Descriptions.Item label="Student ID" span={3}>{data.student_id}</Descriptions.Item>
			<Descriptions.Item label="Equipment Name"span={2}>{data.type_name}</Descriptions.Item>
			<Descriptions.Item label="Borrow Amount" span={1}>{data.borrow_amount}</Descriptions.Item>
			<Descriptions.Item label="Returned Amount" span={1}>{data.returned_amount}</Descriptions.Item>
			<Descriptions.Item label="Due Time" span={2}>{getTime(data.return_date)}</Descriptions.Item>
			<Descriptions.Item label="Action" span={1}>{getStatus(data.log_type)}</Descriptions.Item>
			<Descriptions.Item label="Time"span={2}>{getTime(data.log_time)}</Descriptions.Item>
		</Descriptions>
	);
};

export default EquipmentLogDescription;