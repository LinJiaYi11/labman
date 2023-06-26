import { Table } from "antd";
import { useEffect, useState } from "react";
import { useEquipmentContext } from "../../Context";
import ModifyStudentModal from "../Modals/ModifyEquipmentModal";
import "./style.css";

const EquipmentTable = () => {
	const { data, loading, fetchData, tableParams, setTableParams, setSelectedRows, selectedRows } = useEquipmentContext();
	const [visible, setVisible] = useState(false);
	const [modalData, setModalData] = useState(null);

	const columns = [
		{
			title: "Equipment Type",
			dataIndex: "type_name",
		},
		{
			title: "Available Amount",
			dataIndex: "available_amount",
		},
		{
			title: "Reserved Amount",
			dataIndex: "reserved_amount",
		},
		{
			title: "Total Amount",
			dataIndex: "total_amount",
		},
	];

	useEffect(() => {
		fetchData();
	}, []);

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.type_id) : [],
		onChange: (_,selectedRows) => {
			setSelectedRows(selectedRows);
			console.log("after set: ", selectedRows);
		},
	};

	const onTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

	const onRow = (record) => {
		return {
			onClick: () => {
				setModalData(record);
				setVisible(true);
			},
		};
	};

	const hideModal = () => {
		setVisible(false);
	};

	return (
		<>
			<Table
				columns={columns}
				rowKey={(record) => record.type_id}
				rowSelection={rowSelection}
				dataSource={data}
				pagination={{
					...tableParams.pagination,
					total: data ? data.length : 0,
				}}
				loading={loading}
				onChange={onTableChange}
				scroll={{ x: "max-content" }}
				onRow={onRow}
				rowClassName={"row-hover-cursor"}
			/>
			<ModifyStudentModal open={visible} modalData={modalData} hideModal={hideModal}/>
		</>
		
	);
};

export default EquipmentTable;