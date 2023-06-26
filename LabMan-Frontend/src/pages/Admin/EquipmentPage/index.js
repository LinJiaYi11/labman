import { Row, Col, Space, Divider } from "antd";
import EquipmentTable from "./Components/EquipmentTable";
import NewEquipmentButton from "./Components/Buttons/NewEquipmentButton";
import SearchEquipmentBar from "./Components/Buttons/SearchEquipmentBar";
import DeleteEquipmentButton from "./Components/Buttons/DeleteEquipmentButton";
import EquipmentProvider from "./Context";

function EquipmentPage() {
	return (
		<div>
			<EquipmentProvider>
				<Row justify="space-between" align="middle">
					<Space>
						<Col>
							<NewEquipmentButton />
						</Col>
						<Col>
							<DeleteEquipmentButton />
						</Col>
					</Space>
					<Col>
						<SearchEquipmentBar />
					</Col>
				</Row>
				<Divider/>
				<EquipmentTable />
			</EquipmentProvider>
		</div>
	);
}

export default EquipmentPage;