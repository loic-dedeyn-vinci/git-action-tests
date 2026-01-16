import express from "express";
import booksController from "./controllers/books.controller";
import borrowsControllers from "./controllers/borrows.controller";
import exportCSVController from "./controllers/export-csv.controller";
import userControllers from "./controllers/users.controller";

// creates an express app
const app = express();
app.use(express.json());

// controllers
app.use("/books", booksController);
app.use("/borrows", borrowsControllers);
app.use("/users", userControllers);
app.use("/export-csv", exportCSVController);

export default app;
