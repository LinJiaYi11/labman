import {Modal, Button} from "antd";
import RequestLogDescription from "../../Descriptions/RequestLogDescription";

const RequestModal = ({visible, setVisible, data}) => {
	return (
		<Modal
			open={visible}
			onCancel={() => setVisible(false)}
			footer={
				<Button onClick={() => setVisible(false)}>
                    Close
				</Button>
			}
		>
			<RequestLogDescription data={data}/>
		</Modal>
	);
};

export default RequestModal;
