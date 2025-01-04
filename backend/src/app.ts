import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import eventsRouter from './routes/events';
import selectionsRouter from './routes/selection';
import historyRouter from './routes/history';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/events', eventsRouter);
app.use('/selection', selectionsRouter);
app.use('/history', historyRouter);

app.listen(PORT, () => {
	console.log(`Backend running at http://localhost:${PORT}`);
});

export default app;
