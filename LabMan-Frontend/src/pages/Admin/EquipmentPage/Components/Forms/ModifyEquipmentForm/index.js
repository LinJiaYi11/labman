import { Form, Input, InputNumber } from "antd";
import { useEffect } from "react";

const ModifyEquipmentForm = ({ form, modalData }) => {
	useEffect(() => {
		if (modalData) {
			form.setFieldsValue({
				type_id: modalData.type_id,
				type_name: modalData.type_name,
				available_amount: modalData.available_amount,
				total_amount: modalData.total_amount,
			});
		} else {
			form.resetFields();
		}
	}, [modalData, form]);

	// const validateAvailableAmount = (_, value) => {
	// 	const totalAmount = form.getFieldValue("total_amount");
	// 	if (value <= totalAmount) {
	// 		return Promise.resolve();
	// 	} else {
	// 		return Promise.reject(
	// 			new Error("Available Amount can not be greater than Total Amount")
	// 		);
	// 	}
	// };

	// const validateTotalAmount = (_, value) => {
	// 	const availableAmount = form.getFieldValue("available_amount");
	// 	if (value >= availableAmount) {
	// 		return Promise.resolve();
	// 	} else {
	// 		return Promise.reject(
	// 			new Error("Total Amount can not be less than Available Amount")
	// 		);
	// 	}
	// };


	return (
		<Form form={form} layout="vertical">
			<Form.Item label="Equipment Type" name="type_name">
				<Input />
			</Form.Item>
			{/* <Form.Item
				label="Available Count"
				name="available_amount"
				dependencies={["total_amount"]}
				rules={[
					{ type: "number", min: 0, message: "Available Amount must be greater than 0" },
					// { validator: validateAvailableAmount},
				]}
				disabled={true}
			>
				<InputNumber disabled={true}/>
			</Form.Item>  */}
			<Form.Item
				label="Total Count"
				name="total_amount"
				dependencies={["available_amount"]}
				rules={[
					{ type: "number", min: 0, message: "Total Amount must be greater than 0" },
					// { validator: validateTotalAmount },
				]}
			>
				<InputNumber />
			</Form.Item>
		</Form>
	);
};

export default ModifyEquipmentForm;