import request from "supertest";
import app from "../src/app";
import { Book, getNextId } from "../src/models/book.model";

const dummyBook: Book = {
    id: 1,
    title: "The Test Book",
    author: "A desperate dev",
    year: 2049,
    genre: "Dark comedy",
};

const dummyBooks: Book[] = [
    { id: 1, title: "t1", author: "a1", year: 2025, genre: "g1" },
    { id: 9, title: "t9", author: "a9", year: 2025, genre: "g9" },
    { id: 3, title: "t3", author: "a3", year: 2025, genre: "g3" },
];

const badBook: object = {
    title: 2,
    year: 2049,
    genre: "Dark comedy",
};

const getAll = () => {
    const req = request(app).get("/books");
    return req;
};

const getAllWithFilter = (queryString: string) => {
    const req = request(app).get(`/books?${queryString}`);
    return req;
};

const getById = () => {
    const req = request(app).get("/books/1");
    return req;
};

const createBook = () => {
    const req = request(app).post("/books");
    req.send(dummyBook);
    req.set("Accept", "application/json");
    return req;
};

const createBadBook = () => {
    const req = request(app).post("/books");
    req.send(badBook);
    req.set("Accept", "application/json");
    return req;
};

const update = () => {
    const req = request(app).put("/books");
    req.send(dummyBook);
    req.set("Accept", "application/json");
    return req;
};

const remove = () => {
    const req = request(app).delete("/books/" + dummyBook.id);
    return req;
};

describe("Generate the next book id", () => {
    it("should return 10", () => {
        expect(getNextId(dummyBooks)).toBe(10);
    });
});

describe("GET /books", () => {
    it("should return 200 status code", async () => {
        const response = await getAll();
        expect(response.status).toBe(200);
    });

    it("should return an array of books of Book interface", async () => {
        const response = await getAll();
        expect(response.body).toEqual(
            expect.arrayOf(
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    author: expect.any(String),
                    year: expect.any(Number),
                    genre: expect.any(String),
                })
            )
        );
    });

    it("should return a list of books in JSON format", async () => {
        const response = await getAll();
        expect(response.type).toBe("application/json");
    });
});

describe("GET /books with a query string to filter the books", () => {
    it("should return all the book of the year 2025", async () => {
        const response = await getAllWithFilter("year=2025");
        expect(response.body).toEqual(
            expect.arrayOf(
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    author: expect.any(String),
                    year: 2025,
                    genre: expect.any(String),
                })
            )
        );
    });

    it("should return all the book with the author a1 of the year 2025 and of genre g1", async () => {
        const response = await getAllWithFilter("year=2025&author=a1&genre=g1");
        expect(response.body).toEqual(
            expect.arrayOf(
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    author: "a1",
                    year: 2025,
                    genre: "g1",
                })
            )
        );
    });

    it("should return all the book with title t1", async () => {
        const response = await getAllWithFilter("title=t1");
        expect(response.body).toEqual(
            expect.arrayOf(
                expect.objectContaining({
                    id: expect.any(Number),
                    title: "t1",
                    author: expect.any(String),
                    year: expect.any(Number),
                    genre: expect.any(String),
                })
            )
        );
    });
});

describe("GET /books/:id", () => {
    it("should return a book by id with status 200", async () => {
        const response = await getById();
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                title: "t1",
                author: "a1",
                year: 2025,
                genre: "g1",
            })
        );
    });

    it("should return 400 if id is not a number", async () => {
        const response = await request(app).get("/books/booleaaaan");
        expect(response.status).toBe(400);
    });

    it("should return 404 if book is not found", async () => {
        const response = await request(app).get("/books/77328");
        expect(response.status).toBe(404);
    });
});

describe("POST /books", () => {
    it("should create a new book", async () => {
        const response = await createBook();
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                author: expect.any(String),
                year: expect.any(Number),
                genre: expect.any(String),
            })
        );
    });

    it("should return 201 status code", async () => {
        const response = await createBook();
        expect(response.status).toBe(201);
    });

    it("should return a single book in JSON format", async () => {
        const response = await createBook();
        expect(response.type).toBe("application/json");
    });
});

describe("POST /books with wrong format", () => {
    it("should fail and return 400 status code", async () => {
        const response = await createBadBook();
        expect(response.status).toBe(400);
    });
});

describe("PUT /books", () => {
    it("should update a book", async () => {
        const response = await update();
        expect(response.body).toEqual(
            expect.objectContaining({
                id: dummyBook.id,
                title: dummyBook.title,
                author: dummyBook.author,
                year: dummyBook.year,
                genre: dummyBook.genre,
            })
        );
    });

    it("should return 200 status code", async () => {
        const response = await update();
        expect(response.status).toBe(200);
    });

    it("sould return status 400 if the book data is invalid", async () => {
        const invalidBook = { id: 1, title: 2 };

        const response = await request(app).put("/books").send(invalidBook);

        expect(response.status).toBe(400);
    });

    it("sould return status 404 if the book is not found", async () => {
        const unFoundBook = {
            id: 92698,
            title: "t1",
            author: "Berkan",
            year: 2027,
            genre: "Turc",
        };

        const response = await request(app).put("/books").send(unFoundBook);

        expect(response.status).toBe(404);
    });

    it("should return the updated book in JSON format", async () => {
        const response = await update();
        expect(response.type).toBe("application/json");
    });
});

describe("DELETE /books/:id", () => {
    it("should delete a book", async () => {
        const response = await remove();
        expect(response.status).toBe(204);
    });

    it("should return 400 if id is not a number", async () => {
        const response = await request(app).delete("/books/striiiiing");
        expect(response.status).toBe(400);
    });

    it("should return 404 if book is not found", async () => {
        const response = await request(app).delete("/books/43834");
        expect(response.status).toBe(404);
    });
});
