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
    selectBook: (id: string) => void;
}

const defaultValue = {
    books: [],
    updateBooks: (bookArray: Book[]) => {},
    currentBook: null,
    selectBook: (id: string) => {},
} 

export const AppContext = createContext<Context>(defaultValue);

const AppContextProvider:FC<Props> = ({children}: Props) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [seletedBookId, setSeletedBookId] = useState<Book | null>(null);

    const updateBooks = (bookArray: Book[]) => {
        setBooks(prev => [...prev, ...bookArray])
    }

    const selectBook = (id: string) => {
        setSeletedBookId(id)
    }

    return(
        <AppContext.Provider value={{books, updateBooks, currentBook:seletedBookId, selectBook}}>
            {children}
        </AppContext.Provider>
    );
    
}

export default AppContextProvider