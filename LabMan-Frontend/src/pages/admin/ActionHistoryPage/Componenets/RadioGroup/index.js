import { Radio } from "antd";
import { useActionHistoryContext } from "../../Context";
const TableDataSelector = () => {
	const {setTableSelection} = useActionHistoryContext();

	return (
		<Radio.Group
			onChange={e => setTableSelection(e.target.value)} 
			defaultValue="request" 
			buttonStyle="solid">
			<Radio.Button value="request">Request History</Radio.Button>
			<Radio.Button value="equipment">Borrow History</Radio.Button>
		</Radio.Group>
	);
};

export default TableDataSelector;