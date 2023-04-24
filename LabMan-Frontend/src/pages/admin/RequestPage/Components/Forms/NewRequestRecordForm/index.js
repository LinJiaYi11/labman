import { Form, Input, InputNumber, DatePicker } from "antd";
import { useRequestRecordContext } from "../../../Context";
import EquipmentTypeSelector from "../../Selector/EquipmentTypeSelector";
import { useEffect } from "react";

function NewRequestRecordForm({ form }) {
	const {selectedEquipmentType, equipmentTypeList, searchStudentID} = useRequestRecordContext();

	//when selected type change, update the type name value
	useEffect(() => {
		form.setFieldsValue({
			type_id: selectedEquipmentType,
		});
	}, [selectedEquipmentType]);

	const equipmentTypeID=Form.useWatch("type_id",form);

	const localAvailableNumber=equipmentTypeList.find((type)=>type.type_id===equipmentTypeID)?.available_amount;

	//render the available number when localAvailableNumber changes
	useEffect(() => {
		form.setFieldsValue({
			availableNumber: localAvailableNumber,
		});
	}, [localAvailableNumber]);

	//validate the borrow amount to see if it is greater than available amount
	const validateAmount = (_, value) => {
		const availableAmount = form.getFieldValue("availableNumber");
		if (value <= availableAmount) {
			return Promise.resolve();
		} else {
			return Promise.reject(
				new Error("Borrow amount can not be greater than available amount")
			);
		}
	};

	const validateStudentID = async(_, value) => {
		if (/^a\d{7}$/.test(value) ) {
			const existed =await searchStudentID(value);
			if(existed){
				// setStudentExists(true);
				return Promise.resolve("Student exists");
			}else{
				return Promise.reject(
					new Error("Student ID does not exist")
				);
			}
		} else {
			return Promise.reject(
				new Error("Student ID must start with 'a' and followed by 7 digits")
			);
		}
	};

	return (
		<Form form={form} layout="vertical">
			<Form.Item label="Equipment Name" name="type_id" rules={[{ required: true }]}>
				<EquipmentTypeSelector />
			</Form.Item>
			<Form.Item label="Available Number" name="availableNumber" rules={[{ required: true },{type:Number}]}>
				<p>{localAvailableNumber}</p>
			</Form.Item>
			<Form.Item 
				label="Borrow Amount" 
				name="borrow_amount" 
				rules={[
					{ type: "number", min: 0, message: "Borrow Amount must be greater than 0" },
					{ validator: validateAmount },
				]}
			>
				<InputNumber />
			</Form.Item>
			<Form.Item 
				label="Student ID" 
				name="student_id" 
				rules={[
					{ required: true },
					{ validator: validateStudentID },
				]}>
				<Input />
			</Form.Item>
			<Form.Item label="Due Date" name="return_date" rules={[{ required: true }]}>
				<DatePicker allowClear/>
			</Form.Item>
			{/* Add more form items as needed */}
		</Form>
	);
}

export default NewRequestRecordForm;
