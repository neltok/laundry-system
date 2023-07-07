import { Request, Response } from "express";
import { validateUser } from "../../models/User/userSchema";

export const createUser = async (req: Request, res: Response) => {
    console.log('createUser');
    const newUser = {
        name: "pedro",
        password: 1,
        email: 1.1
    }
    // const valid = validateUser(newUser)
    
    res.send('valid')
};