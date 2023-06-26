import MyLayout from "../MyLayout";
import {
	DatabaseOutlined,
	ImportOutlined,
	TeamOutlined,
	FileOutlined,
	FormOutlined,
	BookOutlined,
	ToolOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router";

const adminMenuItems = [
	{
		key: "/admin/request",
		icon: <FormOutlined />,
		label: "Request",
	},
	{
		key: "/admin/return",
		icon: <ImportOutlined />,
		label: "Return",
	},
	{
		key: "/admin/course",
		icon:<BookOutlined />,
		label: "Course",
	},
	{
		key: "/admin/equipment",
		icon: <DatabaseOutlined />,
		label: "Equipment",
	},
	{
		key: "/admin/student",
		icon: <TeamOutlined />,
		label: "Student",
	},
	{
		key: "/admin/actionHistory",
		icon:<FileOutlined />,
		label: "Action History",
	},
	{
		key: "/admin/setting",
		icon: <ToolOutlined />,
		label: "Setting",
	}
];

const AdminLayout = () => {
	return (
		<MyLayout
			menuItems={adminMenuItems}
		>
			<Outlet />
		</MyLayout>
	);
};

export default AdminLayout;
