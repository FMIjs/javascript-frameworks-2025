import { Router, Request, Response } from "express";
import { bookStorage } from "../storage/book-storage";
import { Book } from "../types/book";

const bookRouter = Router();

bookRouter.get("/", (req : Request, res : Response) => {
    try {
        const filter = req.query.title ? { title: req.query.title as string } : undefined;
        // console.log('Filter object:', filter);
        
        const books = bookStorage.getAll(filter);
        res.send(books);
    } catch (error) {
        console.error('Error in GET /books:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

bookRouter.get("/:id", (req : Request, res : Response) => {
    const id = req.params['id'];
    const book = bookStorage.getById(id);
    res.send(book);
});

bookRouter.post("/", (req : Request, res : Response) => {
    const book = req.body as Book;
    const newBook = bookStorage.insertOne(book);
    res.send(newBook);
});

export default bookRouter;