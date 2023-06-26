import { useContext,createContext, useState} from "react";
import { getPackages, deletePackage,addPackage } from "../../../../api/package";
import { message } from "antd";

const PackageContext = createContext();

export const usePackageContext = () => {
	return useContext(PackageContext);
};

const PackageProvider = ({ children, course_id }) => {
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
		getPackages(course_id).then((data) => {
			setData(data);
		}).catch((error) => {
			if(error.response.status !== 404){
				message.error(error.response.error);
			}
		});
		setLoading(false);
	};

	const onAdd = async (values) => {
		setLoading(true);
		addPackage(course_id, values).then(() => {
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
			await deletePackage(row.package_id);
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
		console.log("edit package for course_id:", course_id, ", course_name:", values.course_name);
		values.type_amount_pairs.map((pair) => {
			console.log("edit pair");
			console.log("type_id:", pair.type_id, ", amount:", pair.amount);
		});
		setLoading(false);
	};

	return (
		<PackageContext.Provider value={
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
				course_id,
			}
		}>
			{children}
		</PackageContext.Provider>
	);
};

export default PackageProvider;