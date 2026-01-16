export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    genre: string;
}

export interface BookFilter {
    title?: string;
    author?: string;
    year?: number;
    genre?: string;
}

// Helper function when we need to create a new book instance
export const getNextId = (books: Book[]): number => {
    const lastId: number = books.reduce((prev, curr) =>
        prev.id > curr.id ? prev : curr
    ).id;

    return lastId + 1;
};
