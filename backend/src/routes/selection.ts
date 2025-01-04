import express, { Request, Response } from 'express';
import { addSelection } from '../services/dataService';
import { VALID_OUTCOMES, SelectedOutcome } from '../types/interfaces';

const router = express.Router();

function isValidOutcome(value: any): value is SelectedOutcome {
	return VALID_OUTCOMES.includes(value);
}

router.post('/', (req: Request, res: Response) => {
	const { eventId, selectedOutcome } = req.body;

	if (typeof eventId !== 'number') {
		res.status(400).json({ error: 'Invalid id selected.' });
		return;
	}

	if (!isValidOutcome(selectedOutcome)) {
		res.status(400).json({ error: `Invalid outcome selected. It must be one of ${VALID_OUTCOMES.join(', ')}.` });
		return;
	}

	try {
		const newSelection = addSelection(eventId, selectedOutcome);
		res.status(201).json(newSelection);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
});

export default router;
