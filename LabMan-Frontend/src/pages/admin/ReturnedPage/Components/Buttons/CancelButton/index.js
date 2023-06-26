import { CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useState } from "react";
import CancelReturnModal from "../../Modals/CancelReturnModal";

const CancelButton = ({record}) => {
	const [open, setOpen] = useState(false);
	const [hintOpen, setHintOpen] = useState(false);

	const onClick = () => {
		setHintOpen(false);
		setOpen(true);
	};

	return (
		<Tooltip
			title={"Undo Return"}
			open={hintOpen}
			onOpenChange={(visible) => {
				setHintOpen(visible);
			}}
		>
			<CloseOutlined 
				fontSize={20}
				onClick={onClick}
			/>
			{record && <CancelReturnModal
				title="Cancel Return"
				open={open}
				hideModal={() => {
					setOpen(false);
				}}
				data={record}
			/>}
		</Tooltip>
	);
};

export default CancelButton;