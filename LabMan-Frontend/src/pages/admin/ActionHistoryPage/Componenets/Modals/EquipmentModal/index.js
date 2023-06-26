import {Modal, Button} from "antd";
import EquipmentLogDescription from "../../Descriptions/EquipmentLogDescription";

const EquipmentModal = ({visible, setVisible, data}) => {
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
			<EquipmentLogDescription data={data}/>
		</Modal>
	);
};

export default EquipmentModal;
