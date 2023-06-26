import ReturnedRecordProvider from "./Context";
import ReturnedRecordTable from "./Components/Table";
import SearchReturnedBar from "./Components/Buttons/SearchReturnedBar";
import CancelAllReturnedButton from "./Components/Buttons/CancelReturnButton";
import { Row, Col, Divider,Space} from "antd";
import ShowUnreturnedButton from "./Components/Buttons/ShowUnreturnedButton";

const ReturnedPage = () => {
	return (
		<ReturnedRecordProvider>
			<Row justify="space-between" align="middle">
				<Space>
					<Col>
						<CancelAllReturnedButton/>
					</Col>
					<Col>
						<ShowUnreturnedButton/>
					</Col>		
				</Space>		
				<Col>
					<SearchReturnedBar />
				</Col>
			</Row>
			<Divider/>
			<ReturnedRecordTable  />
		</ReturnedRecordProvider>
	);
};

export default ReturnedPage;