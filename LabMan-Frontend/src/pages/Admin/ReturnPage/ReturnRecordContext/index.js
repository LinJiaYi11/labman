import { message } from "antd";
import { createContext, useContext, useState } from "react";
import Prosime from "promise";
import { getBorrowedRecords, confirmReturn, searchBorrowRecord } from "../../../../api/return";
import { getEquipmentData } from "../../../../api/equipment";

const ReturnRecordContext = createContext();

export const useReturnRecordContext = () => {
	return useContext(ReturnRecordContext);
};

const ReturnRecordProvider = ({ children }) => {
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
			const data=await getBorrowedRecords();
			setData(data);
		}catch(error){
			message.error(error.message);
			setData([]);
		}
		setLoading(false);
	};

	const onReturnEquipment = async (values) => {		
		const borrow_id = values.borrow_id;
		const returned_amount = values.return_amount;
		try{
			await confirmReturn(borrow_id, returned_amount);
			message.success("Return equipment successfully");
		}
		catch(error){
			message.error(error.message);
		}finally{
			fetchData();
		}	
	};

	const onReturnAllEquipment = async () => {
		try{
			await Prosime.all(selectedRows.map(async(row) => 
			{
				console.log("row: ",row);
				console.log("return amount", row.borrow_amount-row.returned_amount);
				await confirmReturn(row.borrow_id, row.borrow_amount-row.returned_amount);}));
			message.success("Return equipment successfully");
		}catch(error){
			message.error(error.message);
		}finally{
			fetchData();
		}
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
			const data = await searchBorrowRecord(values);
			setData(data);
		}catch(error){
			message.error(error.message);
		}
		setLoading(false);
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
		onReturnEquipment,
		onReturnAllEquipment,
		EquipmentTypeList,
		getEquipmentTypeList,
		onSearch,
	};

	return (
		<ReturnRecordContext.Provider value={value}>
			{children}
		</ReturnRecordContext.Provider>
	);
};


export default ReturnRecordProvider;
