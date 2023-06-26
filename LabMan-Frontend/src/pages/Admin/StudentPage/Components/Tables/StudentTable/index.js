import { Table } from "antd";
import { useStudentContext } from "../../../Context/StudentContext";
import ShowStudentDetailModal from "../../Modals/ShowStudentDetailModal";
import { useEffect, useState } from "react";
import "./style.css";

const StudentTable = () => {
	const { data, fetchData, loading, tableParams, setTableParams, selectedRows, setSelectedRows } = useStudentContext();
	const [detailModalVisible, setDetailModalVisible] = useState(false);
	const [modalData, setModalData] = useState(null);

	const handleClick = (record) => {
		setModalData(record);
		setDetailModalVisible(true);
	};
	const hideDetailModal = () => {
		setDetailModalVisible(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

	const columns = [
		{
			title: "Student ID",
			dataIndex: "student_id",
		}
	];

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.student_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRows(selectedRows);
		},
	};

	const onRow = (record) => {
		return {
			onClick: () => {
				handleClick(record);
			},
		};
	};

	return (
		<>
			<Table
				columns={columns}
				onRow={onRow}
				rowKey={(record) => record.student_id}
				rowSelection={rowSelection}
				dataSource={data}
				pagination={{
					...tableParams.pagination,
					total: data?.length,
				}}
				loading={loading}
				onChange={handleTableChange}
				scroll={{ x: "max-content" }}
				rowClassName={"row-hover-cursor"}
			/>
			<ShowStudentDetailModal
				open={detailModalVisible}
				modalData={modalData}
				hideDetailModal={hideDetailModal}
			/>
		</>
	);
};

export default StudentTable;