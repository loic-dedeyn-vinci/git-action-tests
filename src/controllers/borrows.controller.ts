import { Request, Response, Router } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { User } from "../models/user.model";
import { isNumber } from "../utils/type-guards";
import { booksData } from "../datas/books-data";
import { defaultUsers } from "../datas/users-data";
import { borrows } from "../datas/borrows-data";

const borrowsControllers = Router();

const defaultBorrows: Borrow[] = borrows;

//GET ALL
borrowsControllers.get("/", (req: Request, res: Response) => {
    if (defaultBorrows.length === 0) {
        return res.status(200).send("the library has no books on loan");
    }
    return res.status(200).send(defaultBorrows);
});

//GET BY ID USER
borrowsControllers.get("/user/:id", (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    if (!isNumber(userId)) {
        return res.status(400).send("The provided ID is not a valid format");
    }

    const userBorrows: Borrow[] = [];

    if (userId > 0 && userId <= defaultUsers.length) {
        for (let index = 0; index < defaultBorrows.length; index++) {
            if (Number(defaultBorrows[index].user.id) === userId) {
                userBorrows.push(defaultBorrows[index]);
            }
        }
    } else {
        return res.status(400).send("User not found");
    }

    return res.status(200).send(userBorrows);
});

//GET BY ID BORROW
borrowsControllers.get("/:id", (req: Request, res: Response) => {
    const borrowId = Number(req.params.id);

    if (!isNumber(borrowId)) {
        return res.status(400).send("The provided ID is not a valid format");
    }

    if (borrowId > 0 && borrowId <= defaultBorrows.length) {
        for (let index = 0; index < defaultBorrows.length; index++) {
            if (Number(defaultBorrows[index].id) === borrowId) {
                return res.status(200).send(defaultBorrows[index]);
            }
        }
    }

    return res.status(404).send("Borrow not found");
});

//POST BORROW
borrowsControllers.post("/", (req: Request, res: Response) => {
    const bookId = Number(req.body.book);
    const userId = Number(req.body.user);

    if (!isNumber(userId)) {
        return res
            .status(400)
            .send("The provided ID for the user is not a valid format");
    }

    if (!isNumber(bookId)) {
        return res
            .status(400)
            .send("The provided title for the book is not a valid format");
    }

    const borrowingDate = new Date(req.body.borrowing_date);
    const returnDate = new Date(req.body.return_date);

    if (!borrowingDate || !returnDate) {
        return res
            .status(400)
            .send("The borrowing date and return date are required");
    }

    if (isNaN(borrowingDate.getTime())) {
        return res
            .status(400)
            .send("The provided borrowing date is not a valid format");
    }

    if (isNaN(returnDate.getTime())) {
        return res
            .status(400)
            .send("The provided return date is not a valid format");
    }

    if (borrowingDate >= returnDate) {
        return res
            .status(400)
            .send("The borrowing date must be before the return date");
    }

    let user: User | null = null;

    for (let index = 0; index < defaultUsers.length; index++) {
        if (Number(defaultUsers[index].id) === userId) {
            user = defaultUsers[index];
        }
    }

    if (user === null) {
        return res.status(400).send("User not found");
    }

    let book: Book | null = null;

    for (let index = 0; index < booksData.length; index++) {
        if (booksData[index].id === bookId) {
            book = booksData[index];
        }
    }

    if (book === null) {
        return res.status(400).send("Book not found");
    }

    let alreadyBorrowed = false;
    for (let i = 0; i < defaultBorrows.length; i++) {
        if (
            defaultBorrows[i].book &&
            defaultBorrows[i].book.id === bookId &&
            !defaultBorrows[i].isReturned
        ) {
            alreadyBorrowed = true;
            break;
        }
    }

    if (alreadyBorrowed) {
        return res.status(400).send("This book is already borrowed");
    }

    const newBorrow: Borrow = {
        id: defaultBorrows.length + 1,
        book: book,
        user: user,
        borrowing_date: borrowingDate,
        actual_return_date: undefined,
        return_date: returnDate,
        isReturned: false,
    };

    defaultBorrows.push(newBorrow);
    defaultUsers[userId - 1].borrowHistory.push(newBorrow.id);
    return res.status(201).send(newBorrow);
});

//PUT BORROW (EXTEND THE RETURN DATE)
borrowsControllers.put("/extend/:id", (req: Request, res: Response) => {
    const borrowId = Number(req.params.id);

    if (!isNumber(borrowId)) {
        return res.status(400).send("The provided ID is not a valid format");
    }

    const returnDate = new Date(req.body.return_date);

    if (!returnDate) {
        return res.status(400).send("The return date is required");
    }

    if (isNaN(returnDate.getTime())) {
        return res
            .status(400)
            .send("The provided return date is not a valid format");
    }

    if (borrowId > 0 && borrowId <= defaultBorrows.length) {
        for (let index = 0; index < defaultBorrows.length; index++) {
            if (Number(defaultBorrows[index].id) === borrowId) {
                if (defaultBorrows[index].isReturned) {
                    return res
                        .status(400)
                        .send(
                            "Impossible to extend the loan of an already returned book"
                        );
                }

                if (
                    returnDate.getTime() <
                    defaultBorrows[index].return_date.getTime()
                ) {
                    return res
                        .status(400)
                        .send(
                            "The new return date cannot be earlier than the current return date."
                        );
                }
                defaultBorrows[index].return_date = returnDate;
                return res.status(200).send(defaultBorrows[index]);
            }
        }
    }

    return res.status(404).send("Borrow not found");
});

//PUT BORROW
borrowsControllers.put("/return/:id", (req: Request, res: Response) => {
    const borrowId = Number(req.params.id);

    if (!isNumber(borrowId)) {
        return res.status(400).send("The provided ID is not a valid format");
    }

    if (borrowId > 0 && borrowId <= defaultBorrows.length) {
        for (let index = 0; index < defaultBorrows.length; index++) {
            if (Number(defaultBorrows[index].id) === borrowId) {
                if (defaultBorrows[index].isReturned) {
                    return res
                        .status(400)
                        .send("Impossible to return an already returned book");
                }
                const borrow = defaultBorrows[index];

                borrow.isReturned = true;
                borrow.actual_return_date = new Date(Date.now());

                if (!borrow.actual_return_date) {
                    return res
                        .status(500)
                        .send("actual return date was not set.");
                }

                if (
                    borrow.actual_return_date.getTime() >
                    borrow.return_date.getTime()
                ) {
                    return res
                        .status(200)
                        .send("the borrowed book has now been returned late.");
                }

                return res
                    .status(200)
                    .send("the borrowed book has now been returned.");
            }
        }
    }

    return res.status(404).send("Borrow not found");
});

export default borrowsControllers;
