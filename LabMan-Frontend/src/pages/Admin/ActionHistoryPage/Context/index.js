import { createContext,useState, useContext } from "react";
import { message } from "antd";
import { getEquipmentLogByTypenameAndStudentId,getRequestLogByTypenameAndStudentId } from "../../../../api/log";

const ActionHistoryContext = createContext();

export const useActionHistoryContext = () => {
	return useContext(ActionHistoryContext);
};

const ActionHistoryProvider = ({ children }) => {
	const [data, setData] = useState([]); 
	const [loading, setLoading] = useState(false);
	const [tableSelection, setTableSelection] = useState("request");

	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true,
			pageSizeOptions: ["5", "10", "20", "50"],
		},
	});

	const onSearch = async(value) => {
		setLoading(true);
		try{
			let data;
			if(tableSelection === "request"){
				data = await getRequestLogByTypenameAndStudentId(value);
			}else{
				data = await getEquipmentLogByTypenameAndStudentId(value);
			}
			setData(data);
		}catch(error){
			message.error(error.message);
		}
		setLoading(false);
	};

	return (
		<ActionHistoryContext.Provider
			value={{
				data,
				loading,
				tableParams,
				setTableParams,
				onSearch,
				tableSelection,
				setTableSelection,
			}}
		>
			{children}
		</ActionHistoryContext.Provider>
	);
};

export default ActionHistoryProvider;