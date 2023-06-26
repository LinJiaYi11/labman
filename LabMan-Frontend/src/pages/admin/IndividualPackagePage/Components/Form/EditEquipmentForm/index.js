import {Form, InputNumber} from "antd";

const EditEquipmentForm = ({form}) => {

	return (
		<Form form={form} layout="horizontal">
			<Form.Item name="upper_bound_amount" label={
				form.getFieldValue("type_name").toUpperCase() + " Borrowing Limit"
			} rules={[{required: true}]}>
				<InputNumber min={1}/>
			</Form.Item>
			<Form.Item name="type_name" hidden={true} />
			<Form.Item name="type_id" hidden={true} />
		</Form>
	);
};

export default EditEquipmentForm;