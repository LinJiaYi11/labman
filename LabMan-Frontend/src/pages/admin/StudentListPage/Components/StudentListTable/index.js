import { Table } from "antd";
import { useStudentListContext } from "../../Context";
import { useEffect } from "react";

const StudentListTable = () => {
	const { data,fetchData, tableParams, setTableParams, loading, selectedRows, setSelectedRows} = useStudentListContext();

	const columns = [
		{
			title: "Student ID",
			dataIndex: "student_id",
		},
	];

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data ? data.length : 0,
			},
		});
	}, [data]);

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.student_id) : [],
		onChange: (_, selectedRows) => {
			setSelectedRows(selectedRows);
		},
	};

	const onChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

	return (
		<>
			<Table
				dataSource={data}
				pagination={{
					...tableParams.pagination,
					total: data ? data.length : 0,
				}}
				rowKey={(record) => record.student_id}
				rowSelection={rowSelection}
				loading={loading}
				columns={columns}
				onChange={onChange}
				scroll={{ x: "max-content" }}
			/>
		</>
	);
};

export default StudentListTable;