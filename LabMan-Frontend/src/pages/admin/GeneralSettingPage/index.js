import { Collapse } from "antd";
import Announcement from "./Component/Announcement";
import {useNavigate} from "react-router-dom";

const { Panel } = Collapse;

const GeneralSettingPage = () => {
	const navigate = useNavigate();

	const onEmailClick = () => {
		navigate("/admin/setting/email");
	};

	const emailNotification = () => {
		return (
			<>
				<p>Automatically sending email 7 days earlier before due date</p>
				<a onClick={onEmailClick}>Show Sent Email</a>
			</>
		);
	};

	return (
		<Collapse defaultActiveKey={["1","2"]} >
			<Panel header="Email Notification" key="1">
				{emailNotification()}
			</Panel>
			<Panel header="Announcement" key="2">
				<Announcement/>
			</Panel>
		</Collapse>
	);
};

export default GeneralSettingPage;