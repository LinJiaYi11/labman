import {Input} from "antd";
import {useStudentListContext} from "../../../Context";

const {Search} = Input;
const SearchStudentBar = () => {
	const {onSearch} = useStudentListContext();
	
	const search = (value) => {
		onSearch(value);		
	};

	return (
		<Search placeholder="Input Student ID" onSearch={search} enterButton />
	);
};

export default SearchStudentBar;