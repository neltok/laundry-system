import { Request, Response } from "express";
import { create } from "../../controllers/User/create";

export const createUser = async (req: Request, res: Response) => {
    try {
        console.log('createUser');

        const user = req.body
        const response = await create(user)
        console.log(response);

        res.status(200).json(response)
    } catch (e: any) {
        console.log()
        res.status(400).send({ error: e.message })
    }
};