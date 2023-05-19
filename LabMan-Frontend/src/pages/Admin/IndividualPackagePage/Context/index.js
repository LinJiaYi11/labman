import { useContext,createContext, useState} from "react";
import { message } from "antd";
import { deletePackage } from "../../../../api/package";

const PackageDetailContext = createContext();

export const usePackageDetailContext = () => {
	return useContext(PackageDetailContext);
};

const PackageDetailProvider = ({ children, course_id, package_id }) => {
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
		
		setLoading(false);
	};

	const onAdd = async (values) => {
		setLoading(true);
		console.log("add package for course_id:", course_id, ", course_name:", values.course_name);
		values.type_amount_pairs.map((pair) => {
			console.log("add pair");
			console.log("type_id:", pair.type_id, ", amount:", pair.amount);
		});
		setLoading(false);
	};

	const onDelete = async () => {
		setLoading(true);
		Promise.all(selectedRows.map(async(row) => {
			await deletePackage(course_id, row.package_id);
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
				course_id,
				package_id,
			}
		}>
			{children}
		</PackageDetailContext.Provider>
	);
};

export default PackageDetailProvider;