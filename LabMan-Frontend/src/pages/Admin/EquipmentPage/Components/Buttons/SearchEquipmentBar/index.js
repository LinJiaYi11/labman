import {Input} from "antd";
import { useEquipmentContext } from "../../../Context";

const {Search} = Input;
const SearchEquipmentBar = () => {
	const {onSearch} = useEquipmentContext();

	return (
		<Search placeholder="Input Equipment Type" onSearch={onSearch} enterButton allowClear/>
	);
};

export default SearchEquipmentBar;