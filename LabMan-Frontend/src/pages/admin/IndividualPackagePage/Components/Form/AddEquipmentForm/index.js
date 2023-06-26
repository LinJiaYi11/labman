import{ Form, InputNumber, Select, message } from "antd";
import { useEffect, useState } from "react";
import { getEquipmentData } from "../../../../../../api/equipment";
import { getEquipmentInPackage } from "../../../../../../api/package";
import { usePackageDetailContext } from "../../../Context";

const AddEquipmentForm = ({ form }) => {
	const [equipmentTypeList, setEquipmentTypeList] = useState([]);
	const {package_id} = usePackageDetailContext();
	const type_id=Form.useWatch("type_id", form);

	useEffect(() => {
		getEquipmentData().then((data) => {
			setEquipmentTypeList(data);
		}).catch((error) => {
			message.error(error.message);
		});
	}, []);

	useEffect(() => {
		form.setFieldsValue({
			type_name: equipmentTypeList.find((type) => type.type_id === type_id)?.type_name,
		});
	}, [equipmentTypeList, type_id]);

	const equipmentTypeValidator = async(_, value) => {
		return new Promise((resolve, reject) => {
			getEquipmentInPackage(package_id, value).then(() => {				
				reject("This equipment type is already in the package");
			}).catch(() => {
				resolve();
			});
		});
	};

	return (
		<Form form={form} layout="vertical">
			<Form.Item name="type_id" label="Equipment Type" rules={[
				{ required: true },
				{validator: equipmentTypeValidator}
			]}>
				<Select
					showSearch
					style={{ width: 200 }}
					optionFilterProp="children"
					filterOption={(input, option) => (option?.label ?? "").includes(input)}
					filterSort={(optionA, optionB) =>
						(optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
					}
					options={equipmentTypeList.map((type) => {
						return {
							value: type.type_id,
							label: type.type_name,
						};
					})}
				/>
			</Form.Item>
			<Form.Item name="upper_bound_amount" label="Amount" rules={[{ required: true }]}>
				<InputNumber min={1} />
			</Form.Item>
			<Form.Item name="type_name" hidden={true} />
		</Form>
	);
};

export default AddEquipmentForm;