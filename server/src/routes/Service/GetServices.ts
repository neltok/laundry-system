import { Request, Response } from "express";
import { Get } from "../../controllers/Service/Get";

const log = '[server-routes-get-services]: '

export const GetServices = async (req: Request, res: Response) => {
  try {
    const props = req.body
    const response = await Get(props)
    console.log(`${log} ${JSON.stringify(response)}`);

    res.status(200).json(response)
  } catch (e: any) {
    console.log(`${log} ${JSON.stringify(e)}`);
    res.status(400).send({ error: e.message });
  }
};