import {Table, Space} from "antd";
import {useCourseContext} from "../../Context";
import {useEffect} from "react";
import ShowDetailButton from "../Buttons/ShowDetailButton";

const CourseTable=()=>{
	const {data, setTableParams, loading, tableParams, fetchData, selectedRows, setSelectedRows}=useCourseContext();
	const columns = [
		{
			title: "Course Code",
			dataIndex: "course_id",
		},
		{
			title: "Course Name",
			dataIndex: "course_name",
		},
		{
			title: "Course Coordinator",
			dataIndex: "coordinator_name",
		},
		{
			title: "Action",
			render: (_, record) => (
				<Space>
					<ShowDetailButton course_id={record.course_id}/>
				</Space>
					
			)       
		}
	];

	const onTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};
    
	useEffect(() => {
		console.log("table params", tableParams);
		fetchData();
	}, []);
    
	useEffect(() => {
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data?data.length:0,
			},
		});
	}, [data]);

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.course_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			setSelectedRows(selectedRows);
		},
	};
    
	return(
		<Table 
			rowKey={(record) => record.course_id}
			dataSource={data}
			rowSelection={rowSelection}
			columns={columns}
			loading={loading}
			pagination={tableParams.pagination}
			onChange={onTableChange}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default CourseTable;