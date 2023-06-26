import ReturnRecordProvider from "./ReturnRecordContext";
import ReturnTable from "./Components/Tables/ReturnTable";
import SearchReturnRecordBar from "./Components/Buttons/SearchReturnRecordBar";
import ReturnAllButton from "./Components/Buttons/ReturnAllButton";
import { Row, Col, Divider, Space} from "antd";
import ShowReturnedButton from "./Components/Buttons/ShowReturnedButton";

const ReturnPage = () => {
	return (
		<ReturnRecordProvider>
			<Row justify="space-between" align="middle">
				<Space>
					<Col>
						<ReturnAllButton/>
					</Col>
					<Col>
						<ShowReturnedButton/>
					</Col>
				</Space>
				<Col>
					<SearchReturnRecordBar />
				</Col>
			</Row>
			<Divider/>
			<ReturnTable  />
		</ReturnRecordProvider>
	);
};

export default ReturnPage;
