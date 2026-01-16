import { Book } from "./book.model";
import { User } from "./user.model";

export interface Borrow {
    id: number;
    book: Book;
    user: User;
    borrowing_date: Date;
    actual_return_date: Date | undefined;
    return_date: Date;
    isReturned: boolean;
}
