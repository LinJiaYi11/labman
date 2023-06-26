import { useContext,createContext, useState} from "react";
import { getStudentList, getStudentByStudentId, postStudents,deleteStudent } from "../../../../api/enrollment";
import { message } from "antd";

const StudentListContext = createContext();

export const useStudentListContext = () => {
	return useContext(StudentListContext);
};

const StudentListProvider = ({ children, course_id }) => {
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
		getStudentList(course_id).then((data) => {
			setData(data);
		}).catch((error) => {
			setData([]);
			message.error(error.response.error);
		});
		setLoading(false);
	};

	const onSearch = async (student_id) => {
		setLoading(true);
		getStudentByStudentId(course_id, student_id).then((data) => {
			setData(data);
		}).catch((error) => {
			message.error(error.message);
		});
		setLoading(false);
	};

	const onAdd = async (values) => {
		try{
			await postStudents(course_id, values);
			await fetchData();
			message.success("Add student successfully");
		}catch(error){
			message.error(error.message);
		}
	};

	const onDelete = async () => {
		try{
			await Promise.all(selectedRows.map(async(row) => {
				await deleteStudent(course_id, row.student_id);
			}
			));
			message.success("Delete student successfully");
			fetchData();
		}catch(error){
			message.error(error.message);
		}
	};
	
	return (
		<StudentListContext.Provider value={
			{
				data,
				fetchData,
				loading,
				tableParams,
				setTableParams,
				onSearch,
				onAdd,
				onDelete,
				selectedRows,
				setSelectedRows,
				course_id,
			}
		}>
			{children}
		</StudentListContext.Provider>
	);
};

export default StudentListProvider;