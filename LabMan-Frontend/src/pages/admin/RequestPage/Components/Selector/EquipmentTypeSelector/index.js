import { Select } from "antd";
import { useEffect } from "react";
import {useRequestRecordContext} from "../../../Context";

const EquipmentTypeSelector = ({placeholder}) => {
	const {equipmentTypeList, getEquipmentTypeList, setSelectedEquipmentType} = useRequestRecordContext();

	useEffect(() => {
		getEquipmentTypeList();
	}, []);

	return (
		<Select
			showSearch
			style={{ width: 200 }}
			defaultValue={placeholder}
			onChange={(value) => {setSelectedEquipmentType(value);}}
			optionFilterProp="children"
			filterOption={(input, option) => (option?.label ?? "").includes(input)}
			filterSort={(optionA, optionB) =>
				(optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
			}
			options={equipmentTypeList.map((type) => {
				return {
					value: type.type_name,
					label: type.type_name,
				};
			})}
		/>
	);
	
};

export default EquipmentTypeSelector;