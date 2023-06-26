import { Table } from "antd";
import {useBorrowContext} from "../../../BorrowPageContext";
const BorrowTable = () => {
	const {data, loading, tableParams, selectedRows,setSelectedRows, onTableChange} = useBorrowContext();
	const columns = [
		{
			title: "Request Time",
			dataIndex: "request_date",
			sorter: true,
		},
		{
			title: "Equipment Name",
			dataIndex: "type_name",
			filters: [
				{
					text: "Macbook Pro",
					value: "Macbook Pro",
				},
				{
					text: "Macbook Air",
					value: "Macbook Air",
				},
			],
		},
		{
			title: "Student ID",
			dataIndex: "user_name",
		},
		{
			title: "Amount",
			dataIndex: "borrow_amount",
		},

	];

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.borrow_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			setSelectedRows(selectedRows);//modify this line so we could set row as some identifier
		},
		getCheckboxProps: (record) => ({
			disabled: record.name === "Disabled User",
			// Column configuration not to be checked
			name: record.name,
		}),
	};

	return (
		<Table 
			dataSource={data}
			columns={columns}
			rowKey={(record) => record.borrow_id}
			loading={loading}
			pagination={tableParams.pagination}
			rowSelection={rowSelection}
			onChange={onTableChange}
		/>
	);
};

export default BorrowTable;