import { Borrow } from "../models/borrow.model";
import { booksData } from "./books-data";
import { defaultUsers } from "./users-data";

export const borrows: Borrow[] = [
    {
        id: 1,
        book: booksData[0],
        user: defaultUsers[0],
        borrowing_date: new Date("2025-10-01"),
        actual_return_date: undefined,
        return_date: new Date("2025-10-15"),
        isReturned: false,
    },
    {
        id: 2,
        book: booksData[1],
        user: defaultUsers[1],
        borrowing_date: new Date("2025-10-02"),
        actual_return_date: new Date("2025-10-16"),
        return_date: new Date("2025-10-16"),
        isReturned: true,
    },
    {
        id: 3,
        book: booksData[2],
        user: defaultUsers[2],
        borrowing_date: new Date("2025-10-03"),
        actual_return_date: undefined,
        return_date: new Date("2025-10-17"),
        isReturned: false,
    },
    {
        id: 4,
        book: booksData[2],
        user: defaultUsers[3],
        borrowing_date: new Date("2025-10-04"),
        actual_return_date: new Date("2025-10-12"),
        return_date: new Date("2025-10-18"),
        isReturned: true,
    },
    {
        id: 5,
        book: booksData[2],
        user: defaultUsers[2],
        borrowing_date: new Date("2025-11-04"),
        actual_return_date: new Date("2026-01-07"),
        return_date: new Date("2025-12-18"),
        isReturned: true,
    },
];
