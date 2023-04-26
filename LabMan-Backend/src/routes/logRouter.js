import { Router } from "express";
import { getRequestLogs} from "../controllers/logs/getRequestLogs.js";
import { getEquipmentLogs} from "../controllers/logs/getEquipmentLogs.js";

const logRouter = Router();

//query all users
logRouter.get("/request", getRequestLogs);
logRouter.get("/equipment", getEquipmentLogs);


export { logRouter };