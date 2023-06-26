import { Navigate, Outlet} from "react-router";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import AdminLayout from "../components/layout/AdminLayout";
import RequestPage from "../pages/admin/RequestPage";
import ReturnPage from "../pages/admin/ReturnPage";
import EquipmentPage from "../pages/admin/EquipmentPage";
import StudentPage from "../pages/admin/StudentPage";
import ActionHistoryPage from "../pages/admin/ActionHistoryPage";
import BorrowPage from "../pages/admin/BorrowPage/index.js";
import CoursePage from "../pages/admin/CoursePage";
import IndividualCoursePage from "../pages/admin/IndividualCoursePage";
import StudentList from "../pages/admin/StudentListPage";
import CourseDetailPage from "../pages/admin/CourseDetailPage";
import PackagePage from "../pages/admin/PackagePage";
import IndividualPackagePage from "../pages/admin/IndividualPackagePage";
import ReturnedPage from "../pages/admin/ReturnedPage";
import GeneralSettingPage from "../pages/admin/GeneralSettingPage";
import EmailPage from "../pages/admin/EmailPage";

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