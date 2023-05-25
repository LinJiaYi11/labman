import { Navigate } from "react-router";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Homepage from "../pages/Homepage";
import CoursePage from "../pages/Homepage/CoursePage";
import RequestPage from "../pages/Homepage/RequestPage";
import ReturnPage from "../pages/Homepage/ReturnPage";
import AnouncementPage from "../pages/Homepage/AnnouncementPage";
import ViewRequestPage from "../pages/Homepage/ViewRequestPage";
import EditRequestPage from "../pages/Homepage/EditRequestPage";
import CancelRequestPage from "../pages/Homepage/CancelRequestPage";

const routes = [
	{
		path: "/*",
		element: <PageNotFound />,
	},
	{
		path: "/",
		element: <Navigate to="/login" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path:"/homepage",
		element: <Homepage />,
		children: [
			{
				path: "request",
				element: <CoursePage />,
			},
			{
				path: "request/:course_id",
				element: <RequestPage />,
			},
			{
				path:"request/view",
				element: <ViewRequestPage />,
			},
			{
				path: "request/edit-request/:request_id",
				element: <EditRequestPage />,
			},
			{
				path: "request/cancel-request/:request_id",
				element: <CancelRequestPage />,
			},
			{
				path: "return",
				element: <ReturnPage />,
			},
			{
				path: "announcement",
				element: <AnouncementPage />,
			},
		]
	},
];

export default routes;