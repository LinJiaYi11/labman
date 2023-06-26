import {Menu} from "antd";
import EditRequestModal from "../../Modals/EditRequestModal";
import ShowRequestModal from "../../Modals/ShowRequestModal";
import { useRequestRecordContext } from "../../../Context";

const RowMenu =() => {
	const { contextMenu, 
		setContextMenu,
		setEditModalVisible,
		editModalVisible,
		setShowRequestModalVisible
	} = useRequestRecordContext();

	const items = [
		{
			key: "1",
			label: "Edit",
		},
		{
			key: "2",
			label: "Detail",
		},
	];

	const onClick = ({ key }) => {
		if (key === "1") {
			console.log("Edit");
			setEditModalVisible(true);
			console.log(editModalVisible);
		}else if (key === "2") {
			console.log("Detail");
			setShowRequestModalVisible(true);
		}
		setContextMenu({
			...contextMenu,
			visible: false,
		});
	};

	return (
		<>
			<Menu
				style={{
					position: "absolute",
					left: contextMenu.x,
					top: contextMenu.y,
				}}
				items={items}
				mode="vertical"
				onClick={onClick}
			/>
			<EditRequestModal />	
			<ShowRequestModal />
		</>
	);
};

export default RowMenu;