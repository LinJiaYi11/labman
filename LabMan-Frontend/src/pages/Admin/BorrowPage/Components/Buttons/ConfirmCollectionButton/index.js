import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal,message } from "antd";
import { useBorrowContext } from "../../../BorrowPageContext";

const ConfirmCollectionButton = () => {
	const { confirm } = Modal;
	
	const [messageApi, contextHolder] = message.useMessage();

	const{selectedRows, onDelete}=useBorrowContext();

	const handleConfirm = () => {
		if (selectedRows) {
			showConfirm();
		} else {
			messageApi.warning("Please select a row.");
			console.log("No Equipment selected for deletion");
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Are you sure you want to confirm the equipment collection? ",
			icon: <ExclamationCircleFilled />,
			content: "This will update the request record to show that the equipment has been collected by the student",
			onOk() {
				onDelete();//modify this later
				console.log("OK");
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	return (
		<>
			{contextHolder}
			<Button type="primary" onClick={handleConfirm}>Confirm Collection</Button>
		</>
	);
};

export default ConfirmCollectionButton;