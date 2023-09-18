import { Request, Response } from "express";
import { get } from "../../controllers/Review/get";
import { getCount } from "../../controllers/Review/getCount";

export const getReviewsCount = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const response = await getCount(req.body)

    res.status(200).json(response)
  } catch (e: any) {
    console.log(e);
    res.status(400).send({ error: e.message })
  }
};