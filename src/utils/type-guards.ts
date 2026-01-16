/**
 * This file contains type guards for typescript
 */

import { Book } from "../models/book.model";
import { User } from "../models/user.model";

/**
 * Check if the value is a string and inform typescript of this
 * @param value
 * @returns boolean
 */
const isString = (value: unknown): value is string => {
    return typeof value === "string" || value instanceof String;
};

/* Check if the value is a number and inform typescript of this */
const isNumber = (value: unknown): value is number => {
    return typeof value === "number" && isFinite(value);
};

/**
 * Check if it is a book
 */
export function isBook(data: unknown): data is Book {
    if (
        data &&
        typeof data === "object" &&
        "year" in data &&
        "id" in data &&
        "title" in data &&
        "author" in data &&
        "genre" in data &&
        typeof (data as Book).id === "number" &&
        typeof (data as Book).year === "number" &&
        typeof (data as Book).title === "string" &&
        typeof (data as Book).author === "string" &&
        typeof (data as Book).genre === "string" &&
        (data as Book).title.trim().length > 0 &&
        (data as Book).author.trim().length > 0 &&
        (data as Book).genre.trim().length > 0
    ) {
        return true;
    }

    return false;
}

/**
 * Check if it is an user
 */
export function isUser(data: unknown): data is User {
    if (
        data &&
        typeof data === "object" &&
        "name" in data &&
        "email" in data &&
        "borrowHistory" in data &&
        typeof (data as User).name === "string" &&
        typeof (data as User).email === "string" &&
        Array.isArray((data as User).borrowHistory) &&
        (data as User).name.trim().length > 0 &&
        (data as User).email.trim().length > 0
    ) {
        return true;
    } else {
        return false;
    }
}

export { isString, isNumber };
