import CourseDescription from "./Components/Description";
import { useParams} from "react-router-dom";
import CourseDetailProvider from "./Context";

const CourseDetailPage = () => {
	const {course_id} = useParams();
	return(
		<>
			<CourseDetailProvider course_id={course_id}>
				<CourseDescription />
			</CourseDetailProvider>
		</>
	);
};

export default CourseDetailPage;