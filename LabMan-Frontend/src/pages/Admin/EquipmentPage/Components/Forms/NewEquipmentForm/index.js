import { Form, Input, InputNumber } from "antd";

function NewEquipmentForm({ form }) {
	return (
		<Form form={form} layout="vertical">
			<Form.Item label="Equipment Name" name="type_name" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item label="Total Number" name="total_amount" rules={[{ required: true },{type:"number", min:0, message:"Total amount be be positive"}]}>
				<InputNumber />
			</Form.Item>
		</Form>
	);
}

export default NewEquipmentForm;
