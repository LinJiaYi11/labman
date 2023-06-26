import{EditOutlined} from "@ant-design/icons";
import {useState} from "react";
import EditPackageModal from "../../Modals/EditPackageModal";
import { Tooltip } from "antd";

const EditPackageButton = ({record}) =>{
	const [openModal,setOpenModal] = useState(false);

	const onClick = () =>{
		setOpenModal(true);
	};

	return(
		<>
			<Tooltip title={"Edit Package"} >
				<EditOutlined 
					style={{fontSize:"20px"}}
					onClick={onClick}/>
				<EditPackageModal
					record={record}
					open={openModal}
					hideModal={()=>setOpenModal(false)}
				/>
			</Tooltip>

		</>

	);
};

export default EditPackageButton;