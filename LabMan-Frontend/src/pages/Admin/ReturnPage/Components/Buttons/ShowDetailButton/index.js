import { Button } from "antd";
import ShowDetailModal from "../../Modals/ShowDetailModal";
import {useState} from "react";

function ShowDetailButton({selectedRow}) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleClick = () => {
		setIsModalOpen(true);
		console.log(selectedRow);
	};

	const hideModal = () => {
		setIsModalOpen(false);
	};
    
	return <>
		<Button type="primary" onClick={handleClick}>Details</Button>
		<ShowDetailModal open={isModalOpen} hideModal={hideModal}/>
	</>;
}

export default ShowDetailButton;