import { message } from "antd";
import { createContext, useContext, useState } from "react";
import { getReturnedRecords, searchReturnedRecord, cancelReturnedRecord } from "../../../../api/return";
import { getEquipmentData } from "../../../../api/equipment";

const ReturnedRecordContext = createContext();

export const useReturnedRecordContext = () => {
	return useContext(ReturnedRecordContext);
};

const ReturnedRecordProvider = ({ children }) => {
	const[loading,setLoading] = useState(false);
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([]);
	const [EquipmentTypeList, setEquipmentTypeList] = useState([]);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, 
			pageSizeOptions: ["5", "10", "20", "50"],
		},
	});

	const fetchData = async () => {
		setLoading(true);
		try{
			const data=await getReturnedRecords();
			setData(data);
		}catch(error){
			message.error(error.message);
			setData([]);
		}
		setLoading(false);
	};
	
	const getEquipmentTypeList = async () => {
		try{
			const data = await getEquipmentData();
			setEquipmentTypeList(data);
		}catch(error){
			message.error(error.message);
		}
	};

	const onSearch = async (values) => {
		setLoading(true);
		try{
			const data = await searchReturnedRecord(values);
			setData(data);
			message.success("record found");
		}catch(error){
			message.error(error.message);
		}
		setLoading(false);
	};
	
	const onCancelAll = async () => {
		try{
			await Promise.all(selectedRows.map(async(row) => {
				await cancelReturnedRecord(row.borrow_id, row.returned_amount);
			}));
			//await for another time
			// await sleep(1000);
			message.success("Cancel returned record successfully");
		}catch(error){
			message.error(error.message);
		}finally{
			fetchData();
		}
	};

	// const sleep=(ms) => {
	// 	return new Promise(resolve => setTimeout(resolve, ms));
	// };

	const onCancelReturn=async (values) => {
		const {borrow_id, return_amount} = values;
		try{
			await cancelReturnedRecord(borrow_id, return_amount);
			// await sleep(1000);
			message.success("Cancel returned record successfully");
		}catch(error){
			message.error(error.message);
		}finally{
			fetchData();
		}
	};
    
	const value = {
		loading,
		selectedRows,
		setSelectedRows,
		data,
		setData,
		tableParams,
		setTableParams,
		fetchData,
		EquipmentTypeList,
		getEquipmentTypeList,
		onSearch,
		onCancelAll,
		onCancelReturn,
	};

	return (
		<ReturnedRecordContext.Provider value={value}>
			{children}
		</ReturnedRecordContext.Provider>
	);
};


export default ReturnedRecordProvider;
