import { Row} from "antd";
import BorrowTable from "./Components/Tables/BorrowTable";
import BorrowProvider from "./BorrowPageContext";
import SearchBorrowBar from "./Components/Buttons/SearchBorrowBar";
import ConfirmCollectionButton from "./Components/Buttons/ConfirmCollectionButton";

function BorrowPage() {
	return (
		<div>
			<BorrowProvider>
				<Row justify="space-between" align="middle">
					<SearchBorrowBar />
				</Row>
				<BorrowTable />
				<Row justify={"start"}>
					<ConfirmCollectionButton />
				</Row>
			</BorrowProvider>
		</div>
	);
}

export default BorrowPage;