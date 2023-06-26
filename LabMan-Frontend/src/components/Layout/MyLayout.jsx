import { Layout, Menu, theme } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MyLayout.css";
const { Sider, Content } = Layout;

const MyLayout = ({ children, menuItems }) => {
	const location = useLocation();
	const [selectedKey, setSelectedKey] = React.useState(window.location.pathname);
	const navigate = useNavigate();
	useEffect(() => {
		setSelectedKey(getFirstTwoPathSegments(location.pathname));
	}, [location]);

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const getFirstTwoPathSegments = (pathname) => {
		const segments = pathname.split("/");
		return `/${segments[1]}/${segments[2]}`;
	};

	return (
		<Layout>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={(broken) => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<div className="logo">
					<h3>LabMan</h3>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					selectedKeys={[selectedKey]}
					onClick={({ key }) => {
						navigate(key);
					}}
					items={menuItems.map((item) => (
						{
							...item,
						}
					))}
				>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout >
	);
};
export default MyLayout;
