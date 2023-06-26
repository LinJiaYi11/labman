import { Row, Col, Divider } from "antd";
import TableDataSelector from "./Componenets/RadioGroup";
import SearchLogBar from "./Componenets/SearchLogBar";
import ActionHistoryTable from "./Componenets/ActionHistoryTable";
import  ActionHistoryProvider  from "./Context";

function ActionHistoryPage() {
	return (
		<>
			<ActionHistoryProvider>
				<Row justify={"space-between"}>
					<Col>
						<TableDataSelector/>
					</Col>
					<Col>
						<SearchLogBar/>
					</Col>
				</Row>
				<Divider/>
				<ActionHistoryTable/>
			</ActionHistoryProvider>
		</>
	);
}

export default ActionHistoryPage;