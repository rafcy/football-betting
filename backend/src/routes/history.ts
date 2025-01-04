import express, { Request, Response } from 'express';
import { getSelectionHistory } from '../services/dataService';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	const history = getSelectionHistory();

	if (!history || history.length === 0) {
		res.status(404).json({ error: 'No history found' });
		return;
	}

	res.status(200).json(history);
});

export default router;
