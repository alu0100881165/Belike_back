import express, {Request, Response} from 'express';

import * as UserService from '../services/user.service';
import { UserModel } from '../models/user.model';

export const userRouter = express.Router();


userRouter.get("/:id", async (req: Request, res: Response) => {
    console.log('[GET REQUEST], for user by id');
    const id: number = parseInt(req.params.id, 10);

    try {
        const user: UserModel | null = await UserService.findUser(id);

        if(user) {
            return res.status(200).send(user);
        }
        console.error('[ERROR], user not found');
        return res.status(400).send("User not found");
    } catch (e: any) {
        console.error('[ERROR], user not found');
        res.status(500).send(e.message);
    }
})

userRouter.post("/", async (req: Request, res: Response) => {
    console.log('[POST REQUEST], for creating an user');
    try {
        const user: UserModel = req.body;

        if(user.id) {
            console.error("[Error], id cannot be defined");
            return res.status(400).send("[Error], id cannot be defined");
        }
    
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(specialChars.test(user.username)) {
            console.error("[Error], username contains special characters");
            return res.status(400).send("[Error], username contains special characters");
        }

        if(user.password.length < 7 || !user.password.includes('#')) {
            console.error("[Error], password does not match the requeriments");
            return res.status(400).send("[Error], password does not match the requeriments");
        }

        const newUser = await UserService.createUser(user);

        console.log("New user, ", newUser);

        return res.status(201).send(newUser);
    } catch (e: any) {
        console.error('[ERROR], ', e.message);
        return res.status(500).send(e.message);
    }
})