import { Borrow } from "../src/models/borrow.model";
import { Book } from "../src/models/book.model";
import { User } from "../src/models/user.model";
import { describe, test, expect } from "@jest/globals";
import request from "supertest";
import express from "express";
import borrowsControllers from "../src/controllers/borrows.controller";

const app = express();
app.use(express.json());
app.use("/borrows", borrowsControllers);

describe("Borrow model", () => {
    const book: Book = {
        id: 1,
        title: "Test Book",
        author: "Author",
        year: 2020,
        genre: "Sci-Fi",
    };
    const user: User = {
        id: 1,
        name: "Alice",
        email: "alice@mail.com",
        borrowHistory: [],
    };

    const borrow: Borrow = {
        id: 1,
        book: book,
        user: user,
        borrowing_date: new Date("2025-01-01"),
        return_date: new Date("2025-01-10"),
        actual_return_date: undefined,
        isReturned: false,
    };

    test("borrow should have a correct structure", () => {
        expect(borrow.book.title).toBe("Test Book");
        expect(borrow.user.name).toBe("Alice");
        expect(borrow.isReturned).toBe(false);
    });

    test("borrow dates should be valid, the borrow date should be greather than the borrowing date", () => {
        expect(borrow.return_date.getTime()).toBeGreaterThan(
            borrow.borrowing_date.getTime()
        );
    });

    test("the actual return date should be undefined because the borrow is not returned", () => {
        expect(borrow.actual_return_date).toBe(undefined);
    });
});

describe("Borrows Controller Integration Tests", () => {
    test("GET /borrows should return a list of borrows", async () => {
        const res = await request(app).get("/borrows");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /borrows/user/1 should return borrows for a specific user", async () => {
        const res = await request(app).get("/borrows/user/1");
        expect(res.status).toBe(200);
        expect(res.body.every((b: Borrow) => b.user.id === 1)).toBe(true);
    });

    test("GET /borrows/:id should return a specific borrow", async () => {
        const res = await request(app).get("/borrows/1");
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(1);
    });

    test("POST /borrows should create a new borrow", async () => {
        const res = await request(app).post("/borrows").send({
            book: 2,
            user: 1,
            borrowing_date: "2025-10-30",
            return_date: "2025-11-15",
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
    });

    test("PUT /borrows/extend/:id should extend return date", async () => {
        const res = await request(app)
            .put("/borrows/extend/1")
            .send({ return_date: "2025-12-01" });

        expect(res.status).toBe(200);
        expect(new Date(res.body.return_date)).toBeInstanceOf(Date);
    });

    test("PUT /borrows/extend/:id should return 400 if the new return date is earlier than the current return date", async () => {
        const res = await request(app)
            .put("/borrows/extend/1")
            .send({ return_date: "2023-01-01" });

        expect(res.status).toBe(400);
        expect(res.text).toMatch(
            "The new return date cannot be earlier than the current return date."
        );
    });

    test("PUT /borrows/return/:id should mark book as returned", async () => {
        const res = await request(app).put("/borrows/return/1");
        expect(res.status).toBe(200);
    });

    test("PUT /borrows/return/:id should send 400 status because we try to mark an unexisting book as returned", async () => {
        const res = await request(app).put("/borrows/return/9");
        expect(res.status).toBe(404);
    });
});
