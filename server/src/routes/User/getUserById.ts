import { Request, Response } from "express";
import { getById } from "../../controllers/User/getById";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const response = await getById(req.body)
    console.log(response);

    res.status(200).json(response)
  } catch (e: any) {
    console.log(e)
    res.status(400).send({ error: e.message })
  }
};