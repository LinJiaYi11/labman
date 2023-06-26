import {Tooltip} from "antd";
import ReturnModal from "../../Modals/ReturnModal";
import { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";

const ReturnEquipment = ({record}) => {
	const [open, setOpen] = useState(false);
	const[hintOpen,setHintOpen]=useState(false);

	const onClick = () => {		
		setOpen(true);
		setHintOpen(false);
	};

	return (
		<>
			<Tooltip 
				open={hintOpen}
				onOpenChange={(visible)=>{
					setHintOpen(visible);
				}}
				title={"Return Equipment"}>
				<CheckOutlined 
					fontSize={20}
					onClick={onClick}
				/>
				{record && <ReturnModal 
					open={open} 
					hideModal={() => {
						setOpen(false);
					}}
					record={record}
				/>}
			</Tooltip>
		</>
	);
};

export default ReturnEquipment;

