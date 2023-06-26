import {Breadcrumb, Modal, Table, message, Button} from "antd";
import {useEffect, useState} from "react";
import { getEmailLogs } from "../../../api/email";
import { useNavigate } from "react-router-dom";

const EmailPage = () => {
	const [data, setData] = useState([]);
	const [visible, setVisible] = useState(false);
	const [emailContent, setEmailContent] = useState("");

	const columns = [
		{
			title: "Student ID",
			dataIndex: "student_id",
		},
		{
			title: "Equipment",
			dataIndex: "type_name",
		},
		{
			title:"Amount",
			dataIndex:"borrow_amount",
		},
		{
			title:"Due Date",
			dataIndex:"return_date",
			render: (text) => {
				return formatDate(text);
			},
		},
		{
			title:"Email Address",
			dataIndex:"receiver_email",
		},
		{
			title:"Email Status",
			dataIndex:"email_content",
			render: (text) => {
				return text ? "Sent" : "Not Sent";
			},
		},
	];

	const formatDate = (date) => {
		const d = new Date(date);
		const year = d.getFullYear();
		const month = d.getMonth()+1;
		const day = d.getDate();
		return `${year}-${month}-${day}`;
	};
    
	const getData = async () => {
		try{
			const response = await getEmailLogs();
			setData(response);
		}catch(error){
			message.error(error.message);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const navigate = useNavigate();

	const onRow = (record) => {
		return {
			onClick: () => {
				setEmailContent(record.email_content);
				setVisible(true);
			},
		};
	};
    
	const items = [
		{
			title: "Setting",
			href: "/admin/setting",
			onClick: (e)=>{
				e.preventDefault();
				navigate("/admin/setting");
			}
		},
		{
			title: "Email Logs",
		},
	];

	return (
		<>
			<Breadcrumb style={{ margin: "16px 0" }}
				items={items}
			/>

			<Table
				dataSource={data}
				columns={columns}
				pagination={true}
				onRow={onRow}
				rowClassName={"row-hover-cursor"}
			/>
			<Modal 
				open={visible} 
				onCancel={
					() => {
						setVisible(false);
					}
				}
				footer={
					[
						<Button
							type="primary"
							key={1}
							onClick={
								() => {
									setVisible(false);
								}
							}
						>
                        Close
						</Button>
					]
				}
			>
				<p>{emailContent}</p>
			</Modal>
            
		</>
	);
};

export default EmailPage;