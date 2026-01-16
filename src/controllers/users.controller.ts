import { Request, Response, Router } from "express";
import { User } from "../models/user.model";
import { isNumber, isUser } from "../utils/type-guards";
import { defaultUsers } from "../datas/users-data";

const userControllers = Router();

/**
 * GET ALL Users
 */
userControllers.get("/", (req: Request, res: Response) => {
    return res.status(200).send(defaultUsers);
});

/**
 * GET BY ID
 */
userControllers.get("/:id", (req: Request, res: Response) => {
    const userId = parseInt(`${req.params.id}`);

    if (!isNumber(userId)) {
        return res.status(400).send("The provided ID is not a valid format");
    }

    if (userId > 0 && userId <= defaultUsers.length) {
        for (let index = 0; index < defaultUsers.length; index++) {
            if (Number(defaultUsers[index].id) === userId) {
                return res.status(200).send(defaultUsers[index]);
            }
        }
    }
    return res.status(404).send("User not found");
});

/**
 * POST User
 */
userControllers.post("/", (req: Request, res: Response) => {
    const { name, email, borrowHistory } = req.body;

    if (!isUser(req.body)) {
        return res.sendStatus(400);
    }

    let alreadyExist = false;
    for (let i = 0; i < defaultUsers.length; i++) {
        if (
            defaultUsers[i].name === req.body.name &&
            defaultUsers[i].email === req.body.email
        ) {
            alreadyExist = true;
            break;
        }
    }

    if (alreadyExist) {
        return res.status(400).send("This User already Exist");
    }

    const newUser: User = {
        id: defaultUsers.length + 1,
        name: name,
        email: email,
        borrowHistory: borrowHistory,
    };

    defaultUsers.push(newUser);
    return res.status(201).json(newUser);
});

/**
 * PUT user
 * Updates an existing user by Id
 * Returns 400 if the user data is invalid, 404 if the user is not found
 */
userControllers.put("/", (req: Request, res: Response) => {
    const updatedUser = req.body;

    if (!isUser(updatedUser)) {
        return res.status(400).send("Missing fields or data invalid");
    }

    let indexUser;

    for (let i = 0; i < defaultUsers.length; i++) {
        if (defaultUsers[i].id === updatedUser.id) {
            indexUser = i;
            break;
        }
    }

    if (indexUser === undefined) {
        return res.status(404).send("User not found");
    }

    defaultUsers[indexUser] = updatedUser;

    return res.status(200).json(updatedUser);
});

/**
 * DELETE users
 */
userControllers.delete("/:id", (req: Request, res: Response) => {
    const idUser = parseInt(`${req.params.id}`);

    if (!isNumber(idUser)) {
        return res.status(400).send("Id is not a number");
    }

    let indexUser;

    for (let i = 0; i < defaultUsers.length; i++) {
        if (defaultUsers[i].id === idUser) {
            indexUser = i;
            break;
        }
    }

    if (indexUser === undefined) {
        return res.status(404).send("User not found");
    }

    defaultUsers.splice(indexUser, 1);
    return res.sendStatus(204);
});

export default userControllers;
