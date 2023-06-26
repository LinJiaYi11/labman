import { Form,Input} from "antd";
import { usePackageContext } from "../../../Context";

const NewPackageForm = ({ form }) => {
	const {data}=usePackageContext();

	const nameValidator = async (rule, value) => {
		if (value === "") {
			throw new Error("Please input package name!");
		}
		if (value.length > 50) {
			throw new Error("Package name is too long!");
		}
		data.forEach((item) => {
			if (item.package_name === value) {
				throw new Error("Package name already exists!");
			}
		});
	};

	return(
		<Form form={form}>
			<Form.Item label="Name" name="package_name" rules={[
				{ required: true },
				{validator:nameValidator}
			]}>
				<Input />
			</Form.Item>
		</Form>
	);
};

export default NewPackageForm;