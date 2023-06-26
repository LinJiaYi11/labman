import { useCourseDetailContext } from "../../../Context";
import { Typography, Modal, message } from "antd";
const { Paragraph } = Typography;
import { useEffect, useState } from "react";
const { confirm } = Modal;
import moment from "moment";

const DueDate=()=>{
	const {due_date, changeDueDate}= useCourseDetailContext();
	const [dueDate, setDueDate] = useState(due_date);

	useEffect(() => {
		setDueDate(due_date);
	}, [due_date]);

	useEffect(() => {
		if(dueDate !== due_date){
			onEnd();
		}
	}, [dueDate]);

	const onEnd = () => {
		if(dueDate !== due_date){
			if (!moment(dueDate, "YYYY-MM-DD", true).isValid()) {
				message.warning("Invalid date format. Please use YYYY-MM-DD.");
				setDueDate(due_date);
			} else {
				showConfirm();
			}
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Do you want to submit the changes?",
			content: "This action cannot be undone.",
			onOk() {
				changeDueDate(dueDate);
			},
			onCancel() {
				setDueDate(due_date);
			},
		});
	};

	return(
		<>
			<Paragraph editable={
				{
					onChange: setDueDate,
					onEnd: onEnd,
				}
			}>
				{dueDate}
			</Paragraph>
		</>
	);
};

export default DueDate;