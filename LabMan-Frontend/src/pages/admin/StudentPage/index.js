import StudentProvider from "./Context/StudentContext";
import StudentTable from "./Components/Tables/StudentTable";
import NewStudentButton from "./Components/Buttons/NewStudentButton";
import SearchStudentBar from "./Components/Buttons/SearchStudentBar";
import DeleteStudentButton from "./Components/Buttons/DeleteStudentButton";
import{Row, Col, Space, Divider} from "antd";

const StudentPage=()=>{
	return(
		<StudentProvider>
			<Row justify="space-between" align="middle">
				<Space>
					<Col>
						<NewStudentButton />
					</Col>
					<Col>
						<DeleteStudentButton />
					</Col>
				</Space>
				<Col>
					<SearchStudentBar />
				</Col>				
			</Row>
			<Divider/>
			<StudentTable />
		</StudentProvider>
	);  
};

export default StudentPage;
