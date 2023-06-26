import CoursePackageTable from "./Components/Table";
import PackageProvider from "./Context";
import { useParams } from "react-router-dom";
import{Row, Space, Divider} from "antd";
import NewPackageButton from "./Components/Buttons/NewPackageButton";
import DeletePackageButton from "./Components/Buttons/DeletePackageButton";

const PackagePage = () => {
	const {course_id} = useParams();

	return (
		<PackageProvider course_id={course_id}>
			<Row justify={"start"}>
				<Space>
					<NewPackageButton/>
					<DeletePackageButton/>
				</Space>
			</Row>
			<Divider/>
			<CoursePackageTable/>
		</PackageProvider>
	);
};

export default PackagePage;