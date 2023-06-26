import { createContext, useContext, useState } from "react";
import { getAllCourses, getCourseByCoursenameAndCoordinator, deleteCourse, postCourse } from "../../../../api/course";
import { message } from "antd";

const CourseContext = createContext();

export const useCourseContext = () => {
	return useContext(CourseContext);
};

const CourseProvider = ({ children }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editTableData, setEditTableData] = useState(null); 
	const [selectedRows, setSelectedRows] = useState([]);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, 
			pageSizeOptions: ["5", "10", "20", "50"]
		},
	});

	const fetchData = async () => {
		setLoading(true);
		await getAllCourses().then((data) => {
			setData(data);
		}).catch((err) => {
			setData([]);
			message.error(err.message);
		});
		setLoading(false);
	};

	const onDelete = async () => {	
		await Promise.all(selectedRows.map(async (row) => {
			await deleteCourse(row.course_id);
		})).then(() => {
			message.success("Delete course successfully!");
			setSelectedRows([]);
			fetchData();
		}).catch((err) => {
			message.error(err.message);
		});			
	};

	const onSearch = async (course_name, coordinator_name) => {
		setLoading(true);
		await getCourseByCoursenameAndCoordinator(course_name, coordinator_name).then((data) => {
			setData(data);
		}).catch((err) => {
			message.error(err.message);
		});
		setLoading(false);
	};

	const onAdd = async (values) => {
		await postCourse(values).then(() => {
			message.success("Add course successfully!");
			fetchData();
		}).catch((err) => {
			message.error(err.message);
		});
	};

	return (
		<CourseContext.Provider value={{
			data,
			setData,
			fetchData,
			loading,
			tableParams,
			setTableParams,
			editTableData,
			setEditTableData,
			selectedRows,
			setSelectedRows,
			onDelete,
			onSearch,
			onAdd,
		}}>
			{children}
		</CourseContext.Provider>
	);
};

export default CourseProvider;