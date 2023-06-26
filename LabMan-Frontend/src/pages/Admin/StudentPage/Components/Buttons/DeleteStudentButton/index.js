import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal,message } from "antd";
import { useStudentContext } from "../../../Context/StudentContext";
const { confirm } = Modal;

function DeleteStudentButton() {
	const [messageApi, contextHolder] = message.useMessage();

	const{selectedRows, onDelete}=useStudentContext();

	const handleDelete = () => {
		if (selectedRows && selectedRows.length > 0) {
			console.log("selectedRows:", selectedRows);
			showConfirm();
		} else {
			messageApi.warning("Please select at least one row.");
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Do you want to delete the student(s)?",
			icon: <ExclamationCircleFilled />,
			// content: "Some descriptions",
			onOk() {
				onDelete();
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
			<Button type="primary" danger onClick={handleDelete}>
            Delete
			</Button>
		</>
		
	);
}

export default DeleteStudentButton;