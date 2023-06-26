import { useContext, useState, createContext } from "react";
import { message } from "antd";
import { getCourseById, editCourse } from "../../../../api/course";
import { useNavigate } from "react-router-dom";

const CourseDetailContext = createContext();

export const useCourseDetailContext = () => {
	return useContext(CourseDetailContext);
};

const CourseDetailProvider = ({children, course_id}) => {
	const navigate = useNavigate();
	const [course_name, setCourseName] = useState("");
	const [coordinator_name, setCoordinatorName] = useState("");
	const [due_date, setDueDate] = useState("");
	const [loading, setLoading] = useState(false);

	const formatSqlDate = (sqlDate) => {
		const date = new Date(sqlDate);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return year + "-" + month + "-" + day;
	};

	const fetchCourse = async () => {
		setLoading(true);
		getCourseById(course_id).then((data) => {
			setCourseName(data.course_name);
			setCoordinatorName(data.coordinator_name);
			setDueDate(formatSqlDate(data.due_date));
		}).catch((err) => {
			message.error(err.message);
		});
		setLoading(false);
	};

	const onStudentListClick = () => {
		navigate("/admin/course/"+course_id+"/student_list");
	};

	const onPackageListClick = () => {
		navigate("/admin/course/"+course_id+"/package_list");
	};

	const changeCourseName = (course_name) => {
		console.log("changeCourseName:", course_name);
		const newCourse = {
			course_id: course_id,
			course_name: course_name,
			coordinator_name: coordinator_name,
			due_date: due_date,
		};		
		editCourse(course_id, newCourse).then( fetchCourse() ).catch((err) => {
			message.error(err.message);
		});
	};

	const changeCoordinatorName = (coordinator_name) => {
		console.log("changeCoordinatorName:", coordinator_name);
		const newCourse = {
			course_id: course_id,
			course_name: course_name,
			coordinator_name: coordinator_name,
			due_date: due_date,
		};
		editCourse(course_id, newCourse).then( fetchCourse() ).catch((err) => {
			message.error(err.message);
		});
	};

	const changeDueDate = (due_date) => {
		console.log("changeDueDate:", due_date);
		const newCourse = {
			course_id: course_id,
			course_name: course_name,
			coordinator_name: coordinator_name,
			due_date: due_date,
		};
		editCourse(course_id, newCourse).then( fetchCourse() ).catch((err) => {
			message.error(err.message);
		});
	};

	return (
		<>
			<CourseDetailContext.Provider value={{
				course_id,
				loading,
				course_name,
				coordinator_name,
				due_date,
				changeCourseName,
				changeCoordinatorName,
				changeDueDate,
				onStudentListClick,
				onPackageListClick,
				fetchCourse,
			}}>
				{children}
			</CourseDetailContext.Provider>

		</>
	);
};

export default CourseDetailProvider;
