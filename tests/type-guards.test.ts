import { Book } from "../src/models/book.model";
import { User } from "../src/models/user.model";
import { isNumber, isString, isBook, isUser } from "../src/utils/type-guards";

const dummyBook: Book = {
    id: 1,
    title: "The Test Book",
    author: "A desperate dev",
    year: 2049,
    genre: "Dark comedy",
};

const dummyUser: User = {
    id: 1,
    name: "Alice",
    email: "alice@mail.com",
    borrowHistory: [],
};

describe("Calling isString()", () => {
    test("on a number should return false", () => {
        expect(isString(2)).toBe(false);
    });

    test("on an object should return false", () => {
        expect(isString({})).toBe(false);
    });

    test("on a string literal should return true", () => {
        expect(isString("Hello World")).toBe(true);
    });

    test("on a String instance should return true", () => {
        expect(isString(new String("Hello World"))).toBe(true);
    });

    test("on an empty string should return true", () => {
        expect(isString("")).toBe(true);
    });

    test("on a undefined should return false", () => {
        expect(isString(undefined)).toBe(false);
    });
});

describe("Calling isNumber()", () => {
    test("on a string containing a number should return false", () => {
        expect(isNumber("2")).toBe(false);
    });

    test("on an object should return false", () => {
        expect(isNumber({})).toBe(false);
    });

    test("on a Number instance should return false", () => {
        expect(isNumber(new Number(7))).toBe(false);
    });

    test("on a negative value", () => {
        expect(isNumber(-2)).toBe(true);
    });

    test("on number literal", () => {
        expect(isNumber(10)).toBe(true);
    });
});

describe("Calling isBook()", () => {
    test("on a Book object should return true", () => {
        expect(isBook(dummyBook)).toBe(true);
    });

    test("on an object that is not a Book should return false", () => {
        expect(isBook({ id: 1, title: "tx", year: 2025 })).toBe(false);
    });

    test("on a Book without id should return false", () => {
        expect(
            isBook({
                title: "Whitout id",
                author: "Leonard De Vinci",
                year: 1344,
                genre: "History",
            })
        ).toBe(false);
    });

    test("on a Book with the wrong type and should return false", () => {
        expect(
            isBook({
                id: "String",
                title: "The joconde",
                author: "Leonard De Vinci",
                year: 1764,
                genre: "France",
            })
        ).toBe(false);
    });
});

describe("Calling isUser()", () => {
    test("on a User object should return true", () => {
        expect(isUser(dummyUser)).toBe(true);
    });

    test("on an object that is not a User should return false", () => {
        expect(isUser({ id: 1, name: "tx" })).toBe(false);
    });
});
