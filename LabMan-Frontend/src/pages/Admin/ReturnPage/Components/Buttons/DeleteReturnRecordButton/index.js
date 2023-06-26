import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
const { confirm } = Modal;

function DeleteRequestRecord(props) {
	const handleDelete = () => {
		if (props.selectedRow) {
			showConfirm();
		} else {
			console.log("No record selected for deletion");
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Do you Want to delete the Record?",
			icon: <ExclamationCircleFilled />,
			// content: "Some descriptions",
			onOk() {
				// Call the API to delete the record from the DB
				// ...

				// After the deletion is successful, call the onDelete function (which is fetchData) to refetch the data
				props.onDelete();

				console.log("OK");
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	return (
		<Button type="primary" danger onClick={handleDelete}>
			Delete
		</Button>
	);
}

export default DeleteRequestRecord;