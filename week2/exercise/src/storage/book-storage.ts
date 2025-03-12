import { Book } from "../types/book";
import { Genre } from "../types/genre";
import { EntityStorage } from "./entity-storage";

const books = [
    {
        id: "1",
        title: "1984",
        author: "George Orwell",
        yearOfPublishing: 1949,
        genre: Genre.FICTION 
    },
    {
        id: "2",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        yearOfPublishing: 1960,
        genre: Genre.FICTION 
    },
    {
        id: "3",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        yearOfPublishing: 1925,
        genre: Genre.FICTION 
    },
    {
        id: "4",
        title: "Moby Dick",
        author: "Herman Melville",
        yearOfPublishing: 1851,
        genre: Genre.FICTION 
    },
    {
        id: "5",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        yearOfPublishing: 1813,
        genre: Genre.FICTION 
    },
    {
        id: "6",
        title: "Brave New World",
        author: "Aldous Huxley",
        yearOfPublishing: 1932,
        genre: Genre.FICTION 
    },
    {
        id: "7",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        yearOfPublishing: 1951,
        genre: Genre.FICTION 
    },
    {
        id: "8",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        yearOfPublishing: 1937,
        genre: Genre.FICTION 
    },
    {
        id: "9",
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        yearOfPublishing: 1954,
        genre: Genre.FICTION 
    },
    {
        id: "10",
        title: "War and Peace",
        author: "Leo Tolstoy",
        yearOfPublishing: 1869,
        genre: Genre.FICTION 
    },
    {
        id: "11",
        title: "The Odyssey",
        author: "Homer",
        yearOfPublishing: -800,
        genre:Genre.FICTION 
    },
    {
        id: "12",
        title: "The Divine Comedy",
        author: "Dante Alighieri",
        yearOfPublishing: 1320,
        genre: Genre.FICTION 
    },
    {
        id: "13",
        title: "Frankenstein",
        author: "Mary Shelley",
        yearOfPublishing: 1818,
        genre: Genre.FICTION 
    },
    {
        id: "14",
        title: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        yearOfPublishing: 1880,
        genre: Genre.FICTION 
    },
    {
        id: "15",
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        yearOfPublishing: 1866,
        genre: Genre.FICTION 
    },
    {
        id: "16",
        title: "The Stranger",
        author: "Albert Camus",
        yearOfPublishing: 1942,
        genre: Genre.FICTION 
    },
    {
        id: "17",
        title: "The Picture of Dorian Gray",
        author: "Oscar Wilde",
        yearOfPublishing: 1890,
        genre: Genre.FICTION 
    },
    {
        id: "18",
        title: "The Alchemist",
        author: "Paulo Coelho",
        yearOfPublishing: 1988,
        genre: Genre.FICTION 
    },
    {
        id: "19",
        title: "Don Quixote",
        author: "Miguel de Cervantes",
        yearOfPublishing: 1605,
        genre: Genre.FICTION 
    },
    {
        id: "20",
        title: "Anna Karenina",
        author: "Leo Tolstoy",
        yearOfPublishing: 1877,
        genre: Genre.FICTION 
    }
];

export const bookStorage = new EntityStorage<Book>(books);