import { DatePicker, Form, Input, InputNumber } from "antd";
import { useRequestRecordContext } from "../../../Context";
import { useEffect, useState } from "react";
import moment from "moment";
import { getAvailableAmount} from "../../../../../../api/equipment";

function ModifyRequestForm({ form}) {
	const { modalData} = useRequestRecordContext();
	const[type_name,setType_name]=useState();
	const[request_amount,setRequest_amount]=useState();

	useEffect(() => {
		if (modalData) {
			form.setFieldsValue({
				type_name: modalData.type_name,
				student_id: modalData.student_id,
				borrow_amount: modalData.borrow_amount,
				return_date: moment(modalData.return_date),
				package_id: modalData.package_id,
				upper_bound_amount: modalData.upper_bound_amount,
				type_id: modalData.type_id,
				request_id: modalData.request_id,
			});
			setType_name(modalData.type_name);
			setRequest_amount(modalData.borrow_amount);
		} else {
			form.resetFields();
		}
	}, [modalData, form]);

	const validateAmount = async(_, value) => {
		try{
			const availableAmount=await getAvailableAmount(type_name)+request_amount;
			if (value <= availableAmount) {
				const upper_bound_amount=form.getFieldValue("upper_bound_amount");
				if(value>upper_bound_amount){
					return Promise.reject(
						new Error(`Borrow Amount must be less than or equal to upper bound amount ${upper_bound_amount}`)
					);
				}
				return Promise.resolve();
			} else {
				return Promise.reject(
					new Error(`Borrow Amount must be less than or equal to available amount ${availableAmount}`)
				);
			}
		}catch(err){
			return Promise.reject(new Error(err.message||"unknown error"));
		}
	};

	return (
		<Form 
			form={form} 
			layout="vertical"
		>
			<Form.Item 
				name={"type_id"} hidden/>
			<Form.Item
				name={"request_id"} hidden/>
			<Form.Item label="Equipment Name" 
				name="type_name" 
				hidden={true}
				rules={[{ required: true } ]}/>
			<Form.Item name={"package_id"} hidden/>
			<Form.Item 
				label="Student ID" 
				name="student_id" 
				rules={[
					{ required: true },
				]}>
				<Input 
					disabled={true}
				/>
			</Form.Item>
			<Form.Item 
				label={type_name+" Borrow Amount" }
				name="borrow_amount" 
				rules={[
					{ required: true },
					{ type: "number", min: 0, message: "Borrow Amount must be greater than 0" },
					{ validator: validateAmount },
				]}
			>
				<InputNumber />
			</Form.Item>
			<Form.Item label="Due Date" name="return_date" rules={[{ required: true }]}>
				<DatePicker	
					allowClear={true}
				/>
			</Form.Item>
			<Form.Item name={"upper_bound_amount"} >
				<Input style={{display:"none"}}/>
			</Form.Item>
		</Form>
	);

}

export default ModifyRequestForm;
