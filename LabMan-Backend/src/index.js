import app from "../app.js";
import { v1Router } from "./routes/index.js";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/MySQL/db.js";
import cors from "cors";
import {startEmailTimer} from "./utils/timer/email/startEmailTimer.js";

dotenv.config();

app.use(cors());

const PORT = process.env.PORT;
//3008
connectToDatabase();

app.use(v1Router);

startEmailTimer();

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
