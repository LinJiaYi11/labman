import { createContext, useContext, useState, useEffect } from "react";
// import qs from "qs";

const BorrowContext = createContext();

export const useBorrowContext = () => {
	return useContext(BorrowContext);
};

const BorrowProvider = ({ children }) => {
	const [selectedRows, setSelectedRows] = useState([]);
	const [data, setData] = useState([
		{
			borrow_id: 1,
			request_date: "2021-05-01",
			type_name: "Macbook Pro",
			user_name: "a100001",
			borrow_amount: 1,
		},
		{
			borrow_id: 2,
			request_date: "2021-05-02",
			type_name: "Macbook Air",
			user_name: "a1888882",
			borrow_amount: 2,
		},
		{
			borrow_id: 3,
			request_date: "2021-05-03",
			type_name: "Macbook Pro",
			user_name: "a1888991",
			borrow_amount: 1,
		},

	]);
	const [loading, setLoading] = useState(false);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, // Add this line
			pageSizeOptions: ["5", "10", "20", "50"], // Add this line
		},
	});
	
	const fetchData = async () => {
		setLoading(true);
		setData(data);
		setLoading(false);
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data.length,
				// 200 is mock data, you should read it from server
				// total: data.totalCount,
			},
		});

		// fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
		// 	.then((res) => res.json())
		// 	.then(({ results }) => {
		// 		setData(results);
		// 		setLoading(false);
		// 		setTableParams({
		// 			...tableParams,
		// 			pagination: {
		// 				...tableParams.pagination,
		// 				total: 200,
		// 				// 200 is mock data, you should read it from server
		// 				// total: data.totalCount,
		// 			},
		// 		});
		// 	});
	};

	// const getRandomuserParams = (params) => ({
	// 	results: params.pagination?.pageSize,
	// 	page: params.pagination?.current,
	// 	...params,
	// });

	useEffect(() => {
		fetchData();
	}, [JSON.stringify(tableParams)]);

	const onTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
		fetchData();
	};

	const onSearch = ({searchType, searchValue}) => {
		console.log(searchType, searchValue);
		//add api search here
	};

	const onConfirmCollection = () => {
		console.log(selectedRows);
		//add api confirm collection here
	};

	const value = {
		selectedRows,
		data,
		setData,
		loading,
		tableParams,
		setTableParams,
		fetchData,
		onTableChange,
		setSelectedRows,
		onSearch,
		onConfirmCollection,
	};

	return (
		<BorrowContext.Provider value={value}>
			{children}
		</BorrowContext.Provider>
	);
};

export default BorrowProvider;
