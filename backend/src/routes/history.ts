import express, { Request, Response } from "express";
import { getSelectionHistory } from "../services/dataService";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const history = getSelectionHistory();

    if (!history || history.length === 0) {
        res.status(404).json({ error: "No history found" });
        return;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedHistory = history.slice(startIndex, endIndex);

    res.status(200).json({
        page,
        limit,
        totalItems: history.length,
        totalPages: Math.ceil(history.length / limit),
        data: paginatedHistory,
    });
});

export default router;
