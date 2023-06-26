import { Table } from "antd";
import { usePackageDetailContext } from "../../Context";
import { useEffect } from "react";
import EditRecordButton from "../Buttons/EditRecordButton";

const PackageDetailTable = () => {
	const { data, fetchData, loading, tableParams,setTableParams, onChange, selectedRows, setSelectedRows } = usePackageDetailContext();

	const columns = [
		{
			title: "Type",
			dataIndex: "type_name",
		},
		{
			title: "Quantity",
			dataIndex: "upper_bound_amount",
		},
		{
			title: "Action",
			render: (_, record) => (
				<>
					<EditRecordButton record={record}/>
				</>
			),
		},
	];

	useEffect(() => {
		fetchData();
	}, []);

	const rowSelection = {
		selectedRowKeys: selectedRows.map((row) => row.package_id+row.type_id),
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRows(selectedRows);
		},
	};

	useEffect(() => {
		setTableParams({
			...tableParams,
			total: data ? data.length : 0,
		});
	}, [data]);

	return (
		<Table 
			dataSource={data}
			pagination={{
				...tableParams.pagination,
				total: data ? data.length : 0,
			}}
			rowKey={(record) => record.package_id+record.type_id}
			rowSelection={rowSelection}
			loading={loading}
			columns={columns}
			onChange={onChange}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default PackageDetailTable;