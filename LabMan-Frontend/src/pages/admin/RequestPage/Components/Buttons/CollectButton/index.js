import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal,message } from "antd";
import { useRequestRecordContext } from "../../../Context";

const CollectButton = () => {
	const { confirm } = Modal;
	
	const [messageApi, contextHolder] = message.useMessage();

	const{selectedRows, onCollect}=useRequestRecordContext();

	const handleConfirm = () => {
		if (selectedRows && selectedRows.length > 0) {
			showConfirm();
		} else {
			messageApi.warning("Please select at least one row.");
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Are you sure you want to confirm the equipment collection? ",
			icon: <ExclamationCircleFilled />,
			onOk() {
				onCollect();//modify this later
			},
		});
	};

	return (
		<>
			{contextHolder}
			<Button onClick={handleConfirm}>Collect</Button>
		</>
	);
};

export default CollectButton;