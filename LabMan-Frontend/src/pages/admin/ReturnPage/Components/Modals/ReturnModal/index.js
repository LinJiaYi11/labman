import { Modal,Form,InputNumber } from "antd";
import { useReturnRecordContext } from "../../../ReturnRecordContext";
import { useState } from "react";

const ReturnModal =({open, hideModal, record})=>{
	const {onReturnEquipment}=useReturnRecordContext();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const onOk = async() => {
		setConfirmLoading(true);
		const values = await form.validateFields();
		values.borrow_id=record.borrow_id;
		await onReturnEquipment(values);
		setConfirmLoading(false);
		hideModal();
		form.resetFields();
	};

	const getUnreturnedAmount = () => {
		return record.borrow_amount - record.returned_amount;
	};

	return(
		<Modal 
			title={"Return Equipment"}
			open={open}
			onCancel={hideModal}
			onOk={onOk}
			confirmLoading={confirmLoading}
			destroyOnClose={true}
		>
			<Form 
				form={form}
			>
				<Form.Item 
					label={"Return Amount"} 
					name={"return_amount"}
					rules={[
						{
							required:true,
							message:"Please input the amount of equipment returned"
						},
						{
							type:"number",
							min:1,
							max:getUnreturnedAmount(),
							message:`Please input a number between 1 and ${getUnreturnedAmount()}(remaining amount))`
						}
					]}
				>
					<InputNumber/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ReturnModal;