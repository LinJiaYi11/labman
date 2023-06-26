import { createContext, useContext, useState } from "react";
import {message} from "antd";
import { getEquipmentData, getEquipmentByTypename, postEquipment, deleteEquipment, editEquipment } from "../../../../api/equipment";
const EquipmentContext = createContext();

export const useEquipmentContext = () => {
	return useContext(EquipmentContext);
};

const EquipmentProvider = ({ children }) => {
	//declare state
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([]);//data used by table
	const [modalData, setModalData] = useState(null);
	const [modifyModalVisible, setModifyModalVisible] = useState(false);
	const [loading, setLoading] = useState(false);//loading effect of table
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, 
			pageSizeOptions: ["5", "10", "20", "50"], 
		},
	});
	
	// function to fetch the data
	const fetchData = async () => {
		setLoading(true);
		try{
			const data = await getEquipmentData();
			setData(data);
		}catch(error){
			setData([]);
			message.error(error.message);
		}
		setLoading(false);
	};

	// function called when the user submit a new equipment form
	const onAdd = async (values) => {
		try{
			await postEquipment(values);
			message.success("Equipment added successfully");
		}catch(error){
			message.error(error.message);
		}
		await fetchData();
	};

	
	const onDelete = async() => {
		try{
			await Promise.all(selectedRows.map(async (row) => {
				await deleteEquipment(row.type_id);
			}));
			message.success("Equipment deleted successfully");
		}
		catch(error){
			message.error(error.message);
		}
		await fetchData();
		setSelectedRows([]);
	};

	// function to handle the search
	const onSearch =  async(value) => {
		setLoading(true);
		try{
			const data = await getEquipmentByTypename(value);
			setData(data);
		}catch(error){
			message.error(error.message);
		}
		setLoading(false);
	};

	// function to handle the modify
	const onModify = async (value) => {
		try{
			await editEquipment(value.type_id,value);
			message.success("Equipment modified successfully");
		}catch(error){
			message.error(error.message);
		}
		await fetchData();
		setSelectedRows([]);
	};

	// export the context value
	const value = {
		selectedRows,
		setSelectedRows,
		data,
		setData,
		modalData,
		setModalData,
		modifyModalVisible,
		setModifyModalVisible,
		loading,
		tableParams,
		setTableParams,
		fetchData,
		onAdd,
		onDelete,
		onSearch,
		onModify,
	};

	return (
		<EquipmentContext.Provider value={value}>
			{children}
		</EquipmentContext.Provider>
	);
};

export default EquipmentProvider;
