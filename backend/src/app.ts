import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

import eventsRouter from "./routes/events";
import selectionsRouter from "./routes/selections";
import historyRouter from "./routes/history";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.BACKEND_PORT || 3000;
const API_URL = process.env.API_URL || "http://localhost";

app.use(cors());
app.use(bodyParser.json());

app.use("/events", eventsRouter);
app.use("/selections", selectionsRouter);
app.use("/history", historyRouter);

app.listen(PORT, () => {
    console.log(`Backend running at ${API_URL}:${PORT}`);
});

export default app;
