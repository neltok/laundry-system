import { Request, Response } from "express";
import { get } from "../../controllers/Product/get";

export const getProducts = async (req: Request, res: Response) => {
    try {
        console.log('getAllProducts');
        const { _id } = req.body
        const response = await get(_id)
        console.log(response);

        res.status(200).json(response)
    } catch (e: any) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
};