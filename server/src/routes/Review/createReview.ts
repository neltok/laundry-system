import { Request, Response } from "express";
import { create } from "../../controllers/Review/create";

export const createReview = async (req: Request, res: Response) => {
    try {
        console.log('createReview');

        const review = req.body
        const response = await create(review)
        console.log(response);

        res.status(200).json(response)
    } catch (e: any) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
};