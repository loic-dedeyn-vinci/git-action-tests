import { Request, Response, Router } from "express";
import { Book, BookFilter, getNextId } from "../models/book.model";
import { isBook, isNumber } from "../utils/type-guards";
import { booksData as books } from "../datas/books-data";

const booksController = Router();

/**
 * GET all books
 */
booksController.get("/", (req: Request, res: Response) => {
    const query = req.query;

    const filter: BookFilter = {};

    if (query.title) {
        filter.title = query.title as string;
    }

    if (query.author) {
        filter.author = query.author as string;
    }

    if (query.year) {
        filter.year = parseInt(query.year as string);
    }

    if (query.genre) {
        filter.genre = query.genre as string;
    }

    let results: Book[] = books;

    if (filter.title) {
        results = results.filter((book) => book.title === filter.title);
    }

    if (filter.author) {
        results = results.filter((book) => book.author === filter.author);
    }

    if (filter.year) {
        results = results.filter((book) => book.year === filter.year);
    }

    if (filter.genre) {
        results = results.filter((book) => book.genre === filter.genre);
    }

    res.status(200).json(results);
});

/**
 * GET /books/:id
 * Get a book by Id
 * Return 400 if the id invalid, 404 if the book is not found
 */
booksController.get("/:id", (req: Request, res: Response) => {
    const idBook = parseInt(req.params.id);

    if (!isNumber(idBook)) {
        return res.status(400).send("Id is not a number");
    }

    let indexBook;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === idBook) {
            indexBook = i;
            break;
        }
    }

    if (indexBook === undefined) {
        return res.status(404).send("Book not found");
    }

    return res.status(200).json(books[indexBook]);
});

/**
 * POST
 */
booksController.post("/", (req: Request, res: Response) => {
    const { title, author, year, genre } = req.body;

    const newBook: Book = {
        id: getNextId(books),
        title: title,
        author: author,
        year: year,
        genre: genre,
    };

    if (!isBook(newBook)) {
        return res.sendStatus(400);
    }

    books.push(newBook);

    return res.status(201).json(newBook);
});

/**
 * PUT /books
 * Updates an existing book by Id
 * Returns 400 if the book data is invalid, 404 if the book is not found
 */
booksController.put("/", (req: Request, res: Response) => {
    const updatedBook = req.body;

    if (!isBook(updatedBook)) {
        return res.status(400).send("Missing fields or data invalid");
    }

    let indexBook;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === updatedBook.id) {
            indexBook = i;
            break;
        }
    }

    if (indexBook === undefined) {
        return res.status(404).send("Book not found");
    }

    books[indexBook] = updatedBook;

    return res.status(200).json(updatedBook);
});

/**
 * DELETE /books/:id
 * Deletes a book by Id
 * Returns 400 if the Id is invalid, 404 if the book is not found
 */
booksController.delete("/:id", (req: Request, res: Response) => {
    const idBook = parseInt(req.params.id);

    if (!isNumber(idBook)) {
        return res.status(400).send("Id is not a number");
    }

    let indexBook;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === idBook) {
            indexBook = i;
            break;
        }
    }

    if (indexBook === undefined) {
        return res.status(404).send("Book not found");
    }

    books.splice(indexBook, 1);

    return res.sendStatus(204);
});

export default booksController;
