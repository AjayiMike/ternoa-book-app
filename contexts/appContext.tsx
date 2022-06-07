import {
    useState,
    createContext,
    FC,
    ReactNode,
    useEffect,
    useCallback,
} from "react";
import { Book } from "../types/apiData";

interface Props {
    children: ReactNode;
}

interface Context {
    books: Book[];
    updateBooks: (bookArray: Book[]) => void;
    seletedBookId: string | null;
    selectBook: (id: string | null) => void;
    loading: boolean;
}

const defaultValue = {
    books: [],
    updateBooks: (bookArray: Book[]) => {},
    seletedBookId: null,
    selectBook: (id: string | null) => {},
    loading: true,
};

export const AppContext = createContext<Context>(defaultValue);

const AppContextProvider: FC<Props> = ({ children }: Props) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [seletedBookId, setSeletedBookId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const updateBooks = useCallback((bookArray: Book[]) => {
        setBooks((prev) => [...prev, ...bookArray]);
    }, []);

    const selectBook = useCallback((id: string | null) => {
        setSeletedBookId(() => id);
    }, []);

    const initFunction = useCallback(async () => {
        try {
            const res = await fetch("/api/books");

            if (res.status !== 200) {
                setBooks([]);
                setLoading(false);
                return;
            }
            const parsedResponse = await res.json();
            setBooks(parsedResponse.books);
            setLoading(false);
            console.log("fetched!!!!");
        } catch (error) {
            console.log;
        }
    }, []);

    useEffect(() => {
        initFunction();
    }, []);

    return (
        <AppContext.Provider
            value={{ books, updateBooks, seletedBookId, selectBook, loading }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
