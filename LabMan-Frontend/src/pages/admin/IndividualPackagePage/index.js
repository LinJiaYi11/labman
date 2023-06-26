import { Divider, Row, Space} from "antd";
import PackageDetailTable from "./Components/PackageDetailTable";
import PackageDetailProvider from "./Context";
import { useParams } from "react-router";
import AddEquipmentButton from "./Components/Buttons/AddEquipment";
import DeleteEquipmentButton from "./Components/Buttons/DeleteEquipmentButton";

const IndividualPackagePage = () => {
	const {course_id, package_id} = useParams();
	return (
		<PackageDetailProvider course_id={course_id} package_id={package_id}>
			<Row>
				<Space>
					<AddEquipmentButton/>
					<DeleteEquipmentButton/>
				</Space>
			</Row>
			<Divider/>
			<PackageDetailTable/>
		</PackageDetailProvider>
	);
};

export default IndividualPackagePage;