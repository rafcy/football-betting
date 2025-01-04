import express, { Request, Response } from 'express';
import { getAllEvents } from '../services/dataService';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	const events = getAllEvents();
	res.status(200).json(events);
});

export default router;
