import { useParams } from "react-router-dom";
import StudentListProvider from "./Context";
import StudentListTable from "./Components/StudentListTable";
import SearchStudentBar from "./Components/Buttons/SearchStudentBar";
import AddStudentButton from "./Components/Buttons/AddStudentButton";
import { Row ,Space, Divider, Col} from "antd";
import DeleteStudentButton from "./Components/Buttons/DeleteStudentButton";

const StudentListPage = () => {
	const { course_id } = useParams();
	return (
		<>
			<StudentListProvider course_id={course_id}>
				<Row justify="space-between" align="middle" >
					<Space>
						<Col>
							<AddStudentButton/>
						</Col>
						<Col>
							<DeleteStudentButton/>
						</Col>
					</Space>
					<Col>
						<SearchStudentBar />
					</Col>
				</Row>
				<Divider/>
				<StudentListTable/>
			</StudentListProvider>
		</>
	);
};

export default StudentListPage;