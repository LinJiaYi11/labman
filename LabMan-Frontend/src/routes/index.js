import { Navigate, Outlet} from "react-router";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import AdminLayout from "../components/Layout/AdminLayout";
import RequestPage from "../pages/Admin/RequestPage";
import ReturnPage from "../pages/Admin/ReturnPage";
import EquipmentPage from "../pages/Admin/EquipmentPage";
import StudentPage from "../pages/Admin/StudentPage";
import ActionHistoryPage from "../pages/Admin/ActionHistoryPage";
import BorrowPage from "../pages/Admin/BorrowPage/index.js";
import CoursePage from "../pages/Admin/CoursePage";
import IndividualCoursePage from "../pages/Admin/IndividualCoursePage";
import StudentList from "../pages/Admin/StudentListPage";
import CourseDetailPage from "../pages/Admin/CourseDetailPage";
import PackagePage from "../pages/Admin/PackagePage";
import IndividualPackagePage from "../pages/Admin/IndividualPackagePage";
import ReturnedPage from "../pages/Admin/ReturnedPage";
import GeneralSettingPage from "../pages/Admin/GeneralSettingPage";
import EmailPage from "../pages/Admin/EmailPage";

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
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{
				path: "request",
				element: <RequestPage />,
			},
			{
				path: "borrow",
				element: <BorrowPage />,
			},
			{
				path: "return",
				element:<Outlet />,
				children: [
					{
						index: true,
						element: <ReturnPage />,
					},
					{
						path: "returned",
						element: <ReturnedPage />,
					},
				],
			},
			{
				path: "equipment",
				element: <EquipmentPage />,
			},
			{
				path: "student",
				element:<StudentPage />,
			},
			{
				path: "actionHistory",
				element:<ActionHistoryPage />,
			},
			{
				path: "course",
				element:<Outlet />,
				children:[
					{
						index: true,
						element: <CoursePage />,
					},
					{
						path: ":course_id",
						element: <IndividualCoursePage />, // Use CourseDetailsLayout here
						children: [
							{
								index: true, // Set IndividualCoursePage as the default child route
								element: <CourseDetailPage />,
							},
							{
								path: "student_list",
								element: <StudentList />,
							},
							{
								path: "package_list",
								element: <PackagePage />,
							},
							{
								path: "package_list/:package_id",
								element: <IndividualPackagePage />,
							}
						],
					},
				],
			},
			{
				path: "setting",
				element:<GeneralSettingPage />,
			},
			{
				path:"setting/email",
				element:<EmailPage />,
			}
		]
	}
];

export default routes;