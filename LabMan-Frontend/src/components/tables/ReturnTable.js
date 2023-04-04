import { Table } from "antd";
import qs from "qs";
import { useEffect, useState } from "react";

const columns = [
	{
		title: "Due day",
		dataIndex: "dueDay",
		sorter: true,
	},
	{
		title: "Name",
		dataIndex: "name",
		responsive: ["md"],
	},
	{
		title: "Student ID",
		dataIndex: "studentID",
	},
	{
		title: "Equipment Type",
		dataIndex: "equipmentType",
	},
	{
		title: "Count",
		dataIndex: "count",
		responsive: ["md"],
	},
];

const getRandomuserParams = (params) => ({
	results: params.pagination?.pageSize,
	page: params.pagination?.current,
	...params,
});

const ReturnTable = (props) => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});

	const fetchData = () => {
		setLoading(true);
		fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
			.then((res) => res.json())
			.then(({ results }) => {
				setData(results);
				setLoading(false);
				setTableParams({
					...tableParams,
					pagination: {
						...tableParams.pagination,
						total: 200,
						// 200 is mock data, you should read it from server
						// total: data.totalCount,
					},
				});
			});
	};

	useEffect(() => {
		fetchData();
	}, [JSON.stringify(tableParams)]);

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});

		// `dataSource` is useless since `pageSize` changed
		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([]);
		}
	};

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			props.onRowSelected(selectedRows[0]);
		},
		getCheckboxProps: (record) => ({
			disabled: record.name === "Disabled User",
			// Column configuration not to be checked
			name: record.name,
		}),
	};

	return (
		<Table
			columns={columns}
			rowSelection={{
				type: "radio",
				...rowSelection,
			}}
			rowKey={(record) => record.login.uuid}
			dataSource={data}
			pagination={tableParams.pagination}
			loading={loading}
			onChange={handleTableChange}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default ReturnTable;
