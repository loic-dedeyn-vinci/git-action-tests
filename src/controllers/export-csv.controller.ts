import { Request, Response, Router } from "express";
import fs from "node:fs";
import { Book } from "../models/book.model";
import { booksData } from "../datas/books-data";
import { User } from "../models/user.model";
import { defaultUsers as usersData } from "../datas/users-data";
import { Borrow } from "../models/borrow.model";
import { borrows as borrowsData } from "../datas/borrows-data";

const exportCSVController = Router();

export const bookCSVFirstRow: string = "Id,Title,Author,Year,Genre";
export const borrowCSVFirstRow: string =
    "Id,Book Id,User Id,Borrowing Date,Actual Return Date,Return Date,Is Returned";
export const userCSVFirstRow: string = "Id,Name,Email,Borrow History";

export function booksCSV(books: Book[]): string {
    let plainText: string = bookCSVFirstRow;

    try {
        books.forEach(({ id, title, author, year, genre }) => {
            plainText = plainText.concat(
                "\n",
                id.toString(),
                ",",
                title,
                ",",
                author,
                ",",
                year.toString(),
                ",",
                genre
            );
        });
    } catch (error) {
        console.log(error);
    }

    return plainText;
}

export function borrowCSV(borrows: Borrow[]): string {
    let plainText: string = borrowCSVFirstRow;

    try {
        borrows.forEach((borrow) => {
            plainText = plainText.concat(
                "\n",
                borrow.id.toString(),
                ",",
                borrow.book.id.toString(),
                ",",
                borrow.user.id.toString(),
                ",",
                borrow.borrowing_date.toDateString(),
                ",",
                borrow.actual_return_date !== undefined
                    ? borrow.actual_return_date.toDateString()
                    : " ",
                ",",
                borrow.return_date.toDateString(),
                ",",
                borrow.isReturned ? "true" : "false"
            );
        });
    } catch (error) {
        console.log(error);
    }

    return plainText;
}

export function usersCSV(users: User[]): string {
    let plainText: string = userCSVFirstRow;

    try {
        users.forEach(({ id, name, email, borrowHistory }) => {
            plainText = plainText.concat(
                "\n",
                id.toString(),
                ",",
                name,
                ",",
                email,
                ",",
                // backticks + double quotes are used to keep the ids in the same column in the CSV
                `"${borrowHistory.join(",")}"`
            );
        });
    } catch (error) {
        console.log(error);
    }

    return plainText;
}

export function createBookCSV(books: Book[]): boolean {
    try {
        fs.writeFileSync("books.csv", booksCSV(books));
    } catch {
        return false;
    }

    return true;
}

export function createUserCSV(users: User[]): boolean {
    try {
        fs.writeFileSync("users.csv", usersCSV(users));
    } catch {
        return false;
    }

    return true;
}

export function createBorrowCSV(borrows: Borrow[]): boolean {
    try {
        fs.writeFileSync("borrows.csv", borrowCSV(borrows));
    } catch {
        return false;
    }

    return true;
}

exportCSVController.get("/", (_req: Request, res: Response) => {
    if (!createBorrowCSV(borrowsData)) {
        return res.sendStatus(500);
    }

    if (!createBookCSV(booksData)) {
        return res.sendStatus(500);
    }

    if (!createUserCSV(usersData)) {
        return res.sendStatus(500);
    }

    return res.sendStatus(200);
});

export default exportCSVController;
