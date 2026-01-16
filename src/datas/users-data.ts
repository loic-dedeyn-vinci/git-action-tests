import { User } from "../models/user.model";

export const defaultUsers: User[] = [
    {
        id: 1,
        name: "Alice",
        email: "alice@mail.com",
        borrowHistory: [1],
    },
    {
        id: 2,
        name: "Bob",
        email: "bob@mail.com",
        borrowHistory: [2],
    },
    {
        id: 3,
        name: "Charlie",
        email: "charlie@mail.com",
        borrowHistory: [],
    },
    {
        id: 4,
        name: "Diana",
        email: "diana@mail.com",
        borrowHistory: [4, 5],
    },
];
