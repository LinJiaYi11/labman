import { Form,Input, Select, Space, InputNumber, Button,message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getEquipmentData } from "../../../../../../api/equipment";

const EditPackageForm = ({ form }) => {
	const [equipmentTypeList, setEquipmentTypeList] = useState([]);
	const [packageData, setPackageData] = useState({});

	const getEquipmentTypeList = async () => {
		getEquipmentData().then((data) => {
			setEquipmentTypeList(data);
		}).catch((error) => {
			message.error(error.message);
		});
	};

	const getPackageData = async () => {
		getPackageData().then((data) => {
			setPackageData(data);
		}).catch((error) => {
			message.error(error.message);
		});
	};

	useEffect(() => {
		getEquipmentTypeList();
		getPackageData();
	}, []);

	useEffect(() => {
		if (packageData) {
			form.setFieldsValue({
				package_name: packageData.package_name,
				type_amount_pairs: packageData.type_amount_pairs,
			});
		}
	}, [packageData]);

	return(
		<Form form={form}>
			<Form.Item label="Name" name="package_name" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.List name="type_amount_pairs">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<Space key={key} align="baseline">
								<Form.Item
									{...restField}
									label="Equipment Type"
									name={[name, "type_id"]}
									rules={[{ required: true, message: "Missing Equipment Type" }]}
								>
									<Select showSearch
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
										style={{ width: 150 }}
									>
										{equipmentTypeList.map((type) => {
											return (
												<Select.Option key={type.type_name} value={type.type_id}>
													{type.type_name}
												</Select.Option>
											);
										})}
									</Select>
								</Form.Item>
								<Form.Item
									{...restField}
									label="Amount"
									name={[name, "amount"]}
									rules={[{ required: true, message: "Missing Amount" }]}
								>
									<InputNumber min={1} />
								</Form.Item>
								<MinusCircleOutlined onClick={() => remove(name)} />
							</Space> 
						))}
						<Form.Item>
							<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add Equipment Type
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
		</Form>
	);
};

export default EditPackageForm;