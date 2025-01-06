import express, { Request, Response } from "express";
import { getAllEventsWithoutSelection } from "../services/dataService";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const events = getAllEventsWithoutSelection();
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedEvents = events.slice(startIndex, endIndex);

    const totalItems = events.length;
    const totalPages = Math.ceil(totalItems / limit);

    const response = {
        page: page,
        limit: limit,
        totalPages: totalPages,
        totalItems: totalItems,
        data: paginatedEvents,
    };

    res.status(200).json(response);
});

export default router;
