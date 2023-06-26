import { useContext,createContext, useState} from "react";
import { message } from "antd";
import { deleteEquipment, getPackageById, editEquipment, addEquipment} from "../../../../api/package";

const PackageDetailContext = createContext();

export const usePackageDetailContext = () => {
	return useContext(PackageDetailContext);
};

const PackageDetailProvider = ({ children, package_id }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true,
			pageSizeOptions: ["5", "10", "20", "50"],
			total: 0,
		},
	});
	const[selectedRows, setSelectedRows] = useState([]);

	const fetchData = async () => {
		setLoading(true);
		try{
			const data = await getPackageById(package_id);
			setData(data);
		}catch(error){
			message.error(error.message);
		}		
		setLoading(false);
	};

	const onAdd = async (values) => {
		setLoading(true);
		addEquipment(package_id, values.type_id, values).then(() => {
			message.success("Add package successfully");
			fetchData();
		}).catch((error) => {
			message.error(error.message);
		});
		setLoading(false);
	};

	const onDelete = async () => {
		setLoading(true);
		Promise.all(selectedRows.map(async(row) => {
			await deleteEquipment(package_id, row.type_id);
		})).then(() => {
			message.success("Delete package successfully");
			fetchData();
		}).catch((error) => {
			message.error(error.message);
		});
		setLoading(false);
	};

	const onEdit = async (values) => {
		setLoading(true);
		editEquipment(package_id, values.type_id, values).then(() => {
			message.success("Edit package successfully");
			fetchData();
		}).catch((error) => {
			message.error(error.message);
		});
		setLoading(false);
	};

	return (
		<PackageDetailContext.Provider value={
			{
				data,
				setData,
				loading,
				tableParams,
				setTableParams,
				fetchData,
				onAdd,
				onDelete,
				onEdit,
				selectedRows,
				setSelectedRows,
				package_id,
			}
		}>
			{children}
		</PackageDetailContext.Provider>
	);
};

export default PackageDetailProvider;