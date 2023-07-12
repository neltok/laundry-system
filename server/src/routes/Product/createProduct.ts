import { Request, Response } from "express";
import { create } from "../../controllers/Product/create";

export const createProduct = async (req: Request, res: Response) => {
    try {
        console.log('creatProduct');

        const product = req.body
        const response = await create(product)
        console.log(response);

        res.status(200).json(response)
    } catch (e: any) {
        console.log(e);
        res.status(400).send({ error: e.message })
    }
};