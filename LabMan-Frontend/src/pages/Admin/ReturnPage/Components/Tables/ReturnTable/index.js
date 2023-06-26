import { Table } from "antd";
import { useReturnRecordContext } from "../../../ReturnRecordContext";
import { useEffect } from "react";
import ReturnEquipmentButton from "../../Buttons/ReturnEquipmentButton";

const ReturnTable = () => {
	const { 
		data, 
		fetchData, 
		loading, 
		selectedRows, 
		setSelectedRows, 
		tableParams, 
		setTableParams,
	} = useReturnRecordContext();

	const formatDate = (dateValue) => {
		const date= new Date(dateValue);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return `${year}-${month}-${day}`;
	};

	const columns = [
		{
			title: "Equipment Name",
			dataIndex: "type_name",
		},
		{
			title: "Borrow Time",
			dataIndex: "borrow_date",
			render: (text) => {
				return formatDate(text);
			},
		},
		{
			title: "Due Time",
			dataIndex: "return_date",
			render: (text) => {
				return formatDate(text);
			},
		},
		{
			title: "Student ID",
			dataIndex: "student_id",
		},
		{
			title: "Borrowed Amount",
			dataIndex: "borrow_amount",
		},
		{
			title: "Returned Amount",
			dataIndex: "returned_amount",
		},{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<>
					<ReturnEquipmentButton record={record}/>
				</>
			),
		}

	];

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.borrow_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			setSelectedRows(selectedRows);
		},
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data?data.length:0,}});
	}, [data]);


	const handleTableChange = (pagination, filters) => {
		setTableParams({
			pagination: {
				...tableParams.pagination,
				current: pagination.current,
				pageSize: pagination.pageSize,
			},
			filters,
		});
	};

	return (
		<Table
			columns={columns}
			rowSelection={rowSelection}
			rowKey={(record) => record.borrow_id}
			dataSource={data}
			loading={loading}
			onChange={handleTableChange}
			pagination={tableParams.pagination}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default ReturnTable;
