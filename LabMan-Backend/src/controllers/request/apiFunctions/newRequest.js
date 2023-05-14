import moment from "moment";
import runTransaction from "../../../utils/MySQL/transaction.js";
import pool from "../../../utils/MySQL/db.js";
import { insertRequestLog } from "../../logs/helperFunctions/insertRequestLog.js";
import { insertRequestRecord } from "../helperFunctions/insertRequestRecord.js";
import { compareAvailableAmount } from "../../equipment/helperFunctions/compareAvailableAmount.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { updateReservedAmount } from "../../equipment/helperFunctions/updateReservedAmount.js";
import { updateAvailableAmountAndRemovable } from "../../equipment/helperFunctions/updateAvailableAmountAndRemovable.js";

async function newRequest(req, res) {
	try {
		const { type_id, type_name, student_id, borrow_amount, return_date } = req.body;

		// Create new request record
		const requestRecord = {
			student_id,
			type_id,
			type_name,
			borrow_amount,
			request_time: moment().format("YYYY-MM-DD HH:mm:ss"),
			return_date,
			request_status: 0, // 0 = pending/new request
		};

		// Execute the SQL query with the request_id parameter
		await compareAvailableAmount(pool, type_id, borrow_amount);

		await runTransaction(async (connection) => {

			const insertRequestId = await insertRequestRecord(connection, requestRecord);

			//console.log(insertRequestId);
			const requestLog = {
				type_id,
				type_name,
				student_id,
				borrow_amount,
				return_date,
				log_type: 0, // 0 = new request
				log_time: moment().format("YYYY-MM-DD HH:mm:ss"),
				request_id: insertRequestId,
			};

			const p1 = await insertRequestLog(connection, requestLog);
			const p2 = updateReservedAmount(connection, type_id, borrow_amount);
			const p3 = updateAvailableAmountAndRemovable(connection, type_id, borrow_amount*(-1));
			// Wait for all promises to resolve
			await Promise.all([p1, p2,p3]);
		});

		return res.status(200).json({ message: "New request created successfully" });
	} catch (error) {
		console.error(error);

		// Send error response
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: " +error.message });
	}
}

export { newRequest };