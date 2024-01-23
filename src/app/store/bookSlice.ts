import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../types/book";

export interface BookState {
    books: Book[]
}

const initialState: BookState = {
    books: [
        {
            id: "5gzrYb80d5rr9zsXiHFrN",
            name: "Harry Potter and the Philosopher's Stone",
            price: 14.99,
            category: "Fantasy",
            description: "The book follows Harry, an orphaned boy with magical abilities, as he begins his first year at Hogwarts School of Witchcraft and Wizardry. Alongside his friends Ron and Hermione, Harry uncovers a plot to steal the Philosopher's Stone, leading to the revelation of his own destiny and the resurgence of dark magic."
        }
    ]
}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBook: (state, actions: PayloadAction<Book>) => {
            state.books = [...state.books, actions.payload];
        },
        editBook: (state, actions: PayloadAction<Book>) => {
            const { id, name, price, category, description } = actions.payload;

            state.books = state.books.map((book) => 
                book.id === id ? {
                    ...book, name, price, category, description
                } : book
            );
        },
        deleteBook: (state, actions: PayloadAction<string>) => {
            state.books = state.books.filter((book) => book.id !== actions.payload);
        }
    }
})

export const { addBook, editBook, deleteBook } = bookSlice.actions;

export default bookSlice.reducer;