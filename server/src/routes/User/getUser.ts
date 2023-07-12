import { Request, Response } from "express";
import { get } from "../../controllers/User/get";

export const getUser = async (req: Request, res: Response) => {
    try {
        console.log('getUser');
        const { email, password } = req.body
        const response = await get({ email: email, password: password })
        console.log(response);

        res.status(200).json(response)
    } catch (e: any) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
};