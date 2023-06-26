import CourseProvider from "./Context";
import CourseTable from "./Components/CourseTable";
import DeleteButton from "./Components/Buttons/DeleteButton";
import NewCourseButton from "./Components/Buttons/NewCourseButton";
import SearchCourseBar from "./Components/SearchCourseBar";
import { Row, Col, Space, Divider } from "antd";

const CoursePage = () => {
	return(
		<div>
			<CourseProvider>
				<Row justify="space-between" align="middle">
					<Space>
						<Col>
							<NewCourseButton />
						</Col>
						<Col>
							<DeleteButton />
						</Col>
					</Space>
					<Col>
						<SearchCourseBar />
					</Col>
				</Row>
				<Divider />
				<CourseTable />
			</CourseProvider>
		</div>
	);
};

export default CoursePage;