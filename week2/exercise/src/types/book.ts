import { Genre } from "./genre";


export interface Book {
    id : string;
    title : string;
    author : string;
    yearOfPublishing : number;
    genre : Genre;
}
