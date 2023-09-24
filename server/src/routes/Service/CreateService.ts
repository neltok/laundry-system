import { Request, Response } from "express";
import { Create } from "../../controllers/Service/Create";

const log = '[routes/Service/CreateServices.ts]: '

export const CreateService = async (req: Request, res: Response) => {
  try {
    const service = req.body
    const response = await Create(service)
    console.log(`${log} `, response);
    if (response.success)
      return res.status(200).json(response)
    return res.status(400).json(response)
  } catch (e: any) {
    console.log(`${log}`, e);
    res.status(400).send({ error: e.message })
  }
};