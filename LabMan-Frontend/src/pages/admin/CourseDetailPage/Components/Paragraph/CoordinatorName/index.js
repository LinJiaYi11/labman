import { Typography, Modal, message } from "antd";
import { useEffect, useState } from "react";
const { Paragraph } = Typography;
const { confirm } = Modal;
import { useCourseDetailContext } from "../../../Context";

const CoordinatorName = () => {
	const {coordinator_name, changeCoordinatorName } = useCourseDetailContext();
	const [coordinatorName, setCoordinatorName] = useState(coordinator_name);

	const onEnd = () => {
		if(coordinatorName!== coordinator_name){
			if(coordinatorName === ""){
				message.warning("Course name cannot be empty.");
				setCoordinatorName(coordinator_name);
			}else{
				showConfirm();
			}
		}
	};

	useEffect(() => {
		onEnd();
	}, [coordinatorName]);

	useEffect(() => {
		setCoordinatorName(coordinator_name);
	}, [coordinator_name]);

	const showConfirm = () => {
		confirm({
			title: "Do you want to submit the changes?",
			content: "This action cannot be undone.",
			onOk() {
				changeCoordinatorName(coordinatorName);
			},
			onCancel() {
				setCoordinatorName(coordinator_name);
			},
		});
	};

	return(
		<>
			<Paragraph editable={
				{
					onChange: setCoordinatorName,
					onEnd: onEnd,
					onCancel:onEnd,
				}
			}>
				{coordinatorName}
			</Paragraph>
		</>
	);
};

export default CoordinatorName;