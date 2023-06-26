import { Result } from "antd";
import BackHomeButton from "./Components/BackHomeButton";

function PageNotFound() {
	const containerStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
		width: "100%",
	};

	return (
		<div style={containerStyle}>
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={<BackHomeButton />}
			/>
		</div>
	);
}

export default PageNotFound;
