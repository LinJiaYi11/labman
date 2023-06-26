import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { Input, Select, Space } from "antd";

const SearchBorrowBar = ({ onClick }) => {
	const options = [
		{
			value: "user_name",
			label: "Student ID",
		},
		{
			value: "type_name",
			label: "Equipment Type",
		},
	];
	return (
		<Space.Compact>
			<Select defaultValue="studentID" options={options} />
			<Input defaultValue="" />
			<Tooltip title="Search">
				<Button
					type="primary"
					shape="circle"
					icon={<SearchOutlined />}
					onClick={onClick}
				/>
			</Tooltip>
		</Space.Compact>
	);
};

export default SearchBorrowBar;