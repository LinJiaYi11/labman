import { SearchOutlined } from "@ant-design/icons";
import { Button} from "antd";
import { Input, Space } from "antd";
import { useActionHistoryContext } from "../../Context";
import { useEffect, useState } from "react";

const SearchLogBar = () => {
	const [searchParams, setSearchParams] = useState({
		student_id: "",
		type_name: "",
	}); 
	const {onSearch, tableSelection} = useActionHistoryContext();

	useEffect(() => {
		onClick();
	}, [tableSelection]);

	const onClick = () => {
		onSearch(searchParams);
	};

	const onIDInputChange = (e) => {
		const trimValue=e.target.value.trim();
		setSearchParams({
			...searchParams,
			student_id:trimValue,
		});
	};

	const onEquipmentInputChange = (e) => {
		const trimValue=e.target.value.trim();
		setSearchParams({
			...searchParams,
			type_name:trimValue,
		});
	};

	return (
		<Space>
			<Input 
				onChange={onIDInputChange}
				placeholder="Input Student ID" 
				allowClear 
				onPressEnter={onClick}
			/>
			<Input 
				onChange={onEquipmentInputChange}
				placeholder="Input Equipment Type" 
				allowClear
				onPressEnter={onClick}
			/>
			<Button 
				type="primary" 
				icon={<SearchOutlined />}
				onClick={onClick}
			>
				Search
			</Button>
		</Space>
	);
};

export default SearchLogBar;