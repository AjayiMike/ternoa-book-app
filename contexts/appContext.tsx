import {useState, createContext, FC, ReactNode} from 'react'

interface Book {
}

interface Props {
    children: ReactNode
}

interface Context {
    books: Book[],
    updateBooks: (bookArray: Book[]) => void;
    currentBook: Book | null
    selectBook: (book: Book) => void;
}

const defaultValue = {
    books: [],
    updateBooks: (bookArray: Book[]) => {},
    currentBook: null,
    selectBook: (book: Book) => {},
} 

export const AppContext = createContext<Context>(defaultValue);

const AppContextProvider = ({children}: Props) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [seletedBook, setSeletedBook] = useState<Book | null>(null);

    const updateBooks = (bookArray: Book[]) => {
        setBooks(prev => [...prev, ...bookArray])
    }

    const selectBook = (book: Book) => {
        setSeletedBook(book)
    }

    return(
        <AppContext.Provider value={{books, updateBooks, currentBook:seletedBook, selectBook}}>
        
        </AppContext.Provider>
    );
    
}

export default AppContextProvider