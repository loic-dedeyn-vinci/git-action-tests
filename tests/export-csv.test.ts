import request from "supertest";
import app from "../src/app";
import { Book } from "../src/models/book.model";
import {
    bookCSVFirstRow,
    booksCSV,
    borrowCSV,
    borrowCSVFirstRow,
    createBookCSV,
    createBorrowCSV,
    createUserCSV,
    userCSVFirstRow,
    usersCSV,
} from "../src/controllers/export-csv.controller";
import { User } from "../src/models/user.model";
import { Borrow } from "../src/models/borrow.model";

const book1: Book = {
    id: 1,
    title: "t1",
    author: "a1",
    year: 2025,
    genre: "g1",
};
const book2: Book = {
    id: 2,
    title: "t2",
    author: "a2",
    year: 2025,
    genre: "g2",
};
const user1: User = {
    id: 1,
    name: "Alice",
    email: "alice@mail.com",
    borrowHistory: [],
};
const user2: User = {
    id: 2,
    name: "Bob",
    email: "bob@mail.com",
    borrowHistory: [],
};
const borrow1: Borrow = {
    id: 1,
    book: book1,
    user: user1,
    borrowing_date: new Date("2025-10-01"),
    actual_return_date: undefined,
    return_date: new Date("2025-10-15"),
    isReturned: false,
};
const borrow2: Borrow = {
    id: 2,
    book: book2,
    user: user2,
    borrowing_date: new Date("2025-10-01"),
    actual_return_date: undefined,
    return_date: new Date("2025-10-15"),
    isReturned: false,
};
const borrow3: Borrow = {
    id: 3,
    book: book1,
    user: user2,
    borrowing_date: new Date("2025-10-01"),
    actual_return_date: undefined,
    return_date: new Date("2025-10-15"),
    isReturned: false,
};

user1.borrowHistory.push(borrow1.id);
user2.borrowHistory.push(borrow2.id, borrow3.id);

const exportCSV = () => {
    const req = request(app).get("/export-csv");
    return req;
};

describe("Export Books data to CSV", () => {
    test("Calling bookCSV() with an array of multiple Books should return a string in CSV format", () => {
        expect(booksCSV([book1, book2])).toBe(
            `${bookCSVFirstRow}\n${Object.values(book1).join(",")}\n${Object.values(book2).join(",")}`
        );
    });

    test("Calling bookCSV() with an array of a single Book should return a string in CSV format", () => {
        expect(booksCSV([book1])).toBe(
            `${bookCSVFirstRow}\n${Object.values(book1).join(",")}`
        );
    });

    test("Calling bookCSV() with an empty array should return a string in CSV format", () => {
        expect(booksCSV([])).toBe(`${bookCSVFirstRow}`);
    });

    test("Calling createBookCSV() with an array of multiple Books should return true", () => {
        expect(createBookCSV([book1, book2])).toBeTruthy();
    });

    test("Calling createBookCSV() with an array of a single Book should return true", () => {
        expect(createBookCSV([book1])).toBeTruthy();
    });

    test("Calling createBookCSV() with an empty array should return true", () => {
        expect(createBookCSV([])).toBeTruthy();
    });

    test("GET /export-csv should return 200 status code", async () => {
        const response = await exportCSV();
        expect(response.statusCode).toBe(200);
    });
});

describe("Export Users data to CSV", () => {
    test("Calling userCSV() with an array of multiple Users should return a string in CSV format", () => {
        let csvStringRows: string = userCSVFirstRow.concat("\n");

        csvStringRows = csvStringRows.concat(
            user1.id.toString(),
            ",",
            user1.name,
            ",",
            user1.email,
            ",",
            `"${user1.borrowHistory.join(",")}"`,
            "\n",
            user2.id.toString(),
            ",",
            user2.name,
            ",",
            user2.email,
            ",",
            `"${user2.borrowHistory.join(",")}"`
        );

        expect(usersCSV([user1, user2])).toBe(csvStringRows);
    });

    test("Calling userCSV() with an array of a single User should return a string in CSV format", () => {
        let csvStringRows: string = userCSVFirstRow.concat("\n");

        csvStringRows = csvStringRows.concat(
            user1.id.toString(),
            ",",
            user1.name,
            ",",
            user1.email,
            ",",
            `"${user1.borrowHistory.join(",")}"`
        );

        expect(usersCSV([user1])).toBe(csvStringRows);
    });

    test("Calling userCSV() with an empty array should return a string in CSV format", () => {
        expect(usersCSV([])).toBe(`${userCSVFirstRow}`);
    });

    test("Calling createUserCSV() with an array of multiple Users should return true", () => {
        expect(createUserCSV([user1, user2])).toBeTruthy();
    });

    test("Calling createUserCSV() with an array of a single User should return true", () => {
        expect(createUserCSV([user1])).toBeTruthy();
    });

    test("Calling createUserCSV() with an empty array should return true", () => {
        expect(createUserCSV([])).toBeTruthy();
    });

    test("GET /export-csv should return 200 status code", async () => {
        const response = await exportCSV();
        expect(response.statusCode).toBe(200);
    });
});

describe("Export Borrows data to CSV", () => {
    test("Calling borrowCSV() with an array of multiple Borrows should return a string in CSV format", () => {
        let csvStringRows: string = borrowCSVFirstRow.concat("\n");

        csvStringRows = csvStringRows.concat(
            borrow1.id.toString(),
            ",",
            borrow1.book.id.toString(),
            ",",
            borrow1.user.id.toString(),
            ",",
            borrow1.borrowing_date.toDateString(),
            ",",
            borrow1.actual_return_date !== undefined
                ? borrow1.actual_return_date.toDateString()
                : " ",
            ",",
            borrow1.return_date.toDateString(),
            ",",
            borrow1.isReturned ? "true" : "false",
            "\n",
            borrow2.id.toString(),
            ",",
            borrow2.book.id.toString(),
            ",",
            borrow2.user.id.toString(),
            ",",
            borrow2.borrowing_date.toDateString(),
            ",",
            borrow2.actual_return_date !== undefined
                ? borrow2.actual_return_date.toDateString()
                : " ",
            ",",
            borrow2.return_date.toDateString(),
            ",",
            borrow2.isReturned ? "true" : "false"
        );

        expect(borrowCSV([borrow1, borrow2])).toBe(csvStringRows);
    });

    test("Calling borrowCSV() with an array of a single Borrow should return a string in CSV format", () => {
        let csvStringRows: string = borrowCSVFirstRow.concat("\n");

        csvStringRows = csvStringRows.concat(
            borrow1.id.toString(),
            ",",
            borrow1.book.id.toString(),
            ",",
            borrow1.user.id.toString(),
            ",",
            borrow1.borrowing_date.toDateString(),
            ",",
            borrow1.actual_return_date !== undefined
                ? borrow1.actual_return_date.toDateString()
                : " ",
            ",",
            borrow1.return_date.toDateString(),
            ",",
            borrow1.isReturned ? "true" : "false"
        );

        expect(borrowCSV([borrow1])).toBe(csvStringRows);
    });

    test("Calling borrowCSV() with an empty array should return a string in CSV format", () => {
        expect(borrowCSV([])).toBe(`${borrowCSVFirstRow}`);
    });

    test("Calling createBorrowCSV() with an array of multiple Borrows should return true", () => {
        expect(createBorrowCSV([borrow1, borrow2])).toBeTruthy();
    });

    test("Calling createBorrowCSV() with an array of a single Borrow should return true", () => {
        expect(createBorrowCSV([borrow1])).toBeTruthy();
    });

    test("Calling createBorrowCSV() with an empty array should return true", () => {
        expect(createBorrowCSV([])).toBeTruthy();
    });

    test("GET /export-csv should return 200 status code", async () => {
        const response = await exportCSV();
        expect(response.statusCode).toBe(200);
    });
});
