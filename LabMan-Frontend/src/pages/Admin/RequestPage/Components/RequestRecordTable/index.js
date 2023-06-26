import { Table, message} from "antd";
import { useRequestRecordContext } from "../../Context";
import { useEffect, useState } from "react";
import EditRequestModal from "../Modals/EditRequestModal";
import {EditOutlined} from "@ant-design/icons";

const RequestRecordTable = () => {
	const {
		selectedRows,
		setSelectedRows,
		data,
		fetchData,
		loading,
		tableParams,
		setTableParams,
		setModalData,
	} = useRequestRecordContext();

	const [modalVisibal, setModalVisibal] = useState(false);

	const columns = [
		{
			title: "Request Time",
			dataIndex: "request_time",
			render: (text, record) => {
				return formatDate(record.request_time);
			},
			responive: ["md"],
		},
		{
			title: "Equipment Name",
			dataIndex: "type_name",
		},
		{
			title: "Student ID",
			dataIndex: "student_id",
		},
		{
			title: "Amount",
			dataIndex: "borrow_amount",
		},
		{
			title:"Due Date",
			dataIndex:"return_date",
			render: (text) => {
				return formatDate(text);
			},
			responsive: ["md"],
		},
		{
			title:"Action",
			key:"action",
			render: (_, record) => {
				return(
					<>
						<EditOutlined 
							style={{fontSize:"20px"}}
							onClick={() => {
								setModalData(record);
								console.log(record);
								setModalVisibal(true);
							}
							}/>
					</>
				);
			},
		}
	];

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.request_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRows(selectedRows);
		},
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		try {
			setTableParams({
				...tableParams,
				pagination: {
					...tableParams.pagination,
					total: data?data.length:0,
				},
			});
		}catch(err){
			message.error(err.message);
		}
	}, [data]);


	const handleTableChange = (pagination, filters) => {
		setTableParams({
			...tableParams,
			pagination: pagination,
			filters: filters,
		});
	};

	const hideModal = () => {
		setModalVisibal(false);
	};

	return (
		<>
			<Table
				columns={columns}
				rowSelection={rowSelection}
				rowKey={(record) => record.request_id} 
				dataSource={data}
				loading={loading}
				pagination={tableParams.pagination}
				onChange={handleTableChange}
				scroll={{ x: "max-content" }}
			/>
			<EditRequestModal open={modalVisibal} hideModal={hideModal}/>
		</>
	);
};

export default RequestRecordTable;