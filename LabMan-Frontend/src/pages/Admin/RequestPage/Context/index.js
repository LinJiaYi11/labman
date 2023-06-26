import { createContext, useContext, useState } from "react";
import { message } from "antd";
import { getPendingRequest, getPendingRequestByTypenameAndStudentId, putRequest, postRequest, cancelRequest, collectRequest } from "../../../../api/request";
import { getEquipmentData } from "../../../../api/equipment";
import { getStudentById } from "../../../../api/student";

const RequestRecordContext = createContext();

export const useRequestRecordContext = () => {
	return useContext(RequestRecordContext);
};

const RequestRecordProvider = ({ children }) => {
	// declare variables
	const [loading,setLoading] = useState(false);
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([]);
	const [modalData, setModalData] = useState(null);
	const [equipmentTypeList, setEquipmentTypeList] = useState([]);
	const [selectedEquipmentType, setSelectedEquipmentType] = useState(null);

	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, 
			pageSizeOptions: ["5", "10", "20", "50"],
		},
		filters: {
			request_status: [0],
		},
	});

	//fetch data
	const fetchData = async () => {
		setLoading(true);
		try {
			const data = await getPendingRequest();
			setData(data);
		} catch (error) {
			message.error(error.message);
			setData([]);
		}
		setLoading(false);
	};

	
	const onAdd = async (values) => {
		try{
			const student_id = values.student_id;
			const package_id = values.package_id;
			await Promise.all(values.request_items.map(async (item) => {
				const type_id = item.type_id;
				const type_name= item.type_name;
				const borrow_amount = item.borrow_amount;
				const upper_bound_amount = item.upper_bound_amount;
				const request_values = {
					student_id,
					package_id,
					type_id,
					type_name,
					borrow_amount,
					upper_bound_amount,
				};
				await postRequest(request_values);
			}));
			message.success("Request Added Successfully!");
		}catch(error){
			message.error(error.message);
		}
		fetchData();
	};

	const onCancelRequest= async (values) => {
		try{
			await Promise.all(selectedRows.map(async (row) => {
				await cancelRequest(row.request_id, values);
			}));
			message.success("Request Cancelled Successfully!");
		}catch(error){
			message.error(error.message);
		}
		fetchData();
	};

	const onCollect= async () => {
		try{
			await Promise.all(selectedRows.map(async (row) => {
				await collectRequest(row.request_id);
			}));
			message.success("Request Collected Successfully!");
		}catch(error){
			message.error(error.message);
		}
		fetchData();
	};

	const onEdit = async (values) => {
		try{
			await putRequest(values);
			message.success("Request Edited Successfully!");
		}catch(error){
			message.error(error.message);
		}
		fetchData();
	};

	const onSearch = async (values) => {
		setLoading(true);
		try{
			const data = await getPendingRequestByTypenameAndStudentId(values);
			setData(data);
		}catch(error){
			message.error(error.message);
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

	const searchStudentID = async (student_id) => {
		try{
			await getStudentById(student_id);
			return true;
		}catch(error){
			return false;
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
		modalData,
		setModalData,
		onAdd,
		onCancelRequest,
		onCollect,
		onEdit,
		onSearch,
		equipmentTypeList,
		getEquipmentTypeList,
		selectedEquipmentType,
		setSelectedEquipmentType,
		searchStudentID,
	};

	return (
		<RequestRecordContext.Provider value={value}>
			{children}
		</RequestRecordContext.Provider>
	);
};

export default RequestRecordProvider;
