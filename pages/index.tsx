import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import { Fragment, MouseEvent, useCallback, useEffect, useState } from "react";
import Book from "../components/Book";
import DeleteModal from "../components/DeleteModal";
import { Book as BookType } from "../types/apiData";
import { toast } from 'react-toastify';
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";

interface Props {
    books: BookType[]
}

const Home: NextPage<Props> = ({books}) => {
    const tabs = {
        myBooks: "mybooks",
        allBooks: "allbooks",
    };
    
    const [bookState, setBookState] = useState(books);
    const [idTobeDeleted, setIdTobeDeleted] = useState<string | null>(null)
    const [bookTitleToBeDeleted, setBookTitleToBeDeleted] = useState<string | null>(null)
    const [myBooks, setMyBooks] = useState<BookType[] | null>(null)

    const {active, account} = useWeb3React()

    const router = useRouter()

    const tab = router.query.tab;
    
    

    useEffect(() => {
      if(!idTobeDeleted)
      return setBookTitleToBeDeleted(null)

      const bookToBeDeleted = books.find(book => book._id === idTobeDeleted);
      setBookTitleToBeDeleted(() => bookToBeDeleted!.title)
    }, [idTobeDeleted])


    const deleteBook = useCallback(async () => {
        if(!idTobeDeleted) return;
        
        try {
            const deletedRes = await fetch("/api/books/delete", {
                method: "DELETE",
                body: JSON.stringify({id: idTobeDeleted})
            })            
    
            if(deletedRes.status !== 200)
            return toast("something went wrong! Please try again")
            const filteredBooks = bookState.filter(book => book._id !== idTobeDeleted)
            setBookState(() => filteredBooks)
            toast(`sucessfully deleted the book titled ${bookTitleToBeDeleted}`)
            setIdTobeDeleted(() => null);
            setBookTitleToBeDeleted(() => null)
        } catch (error) {
            console.error("error deleting book: ", error);
            toast("something went wrong! Please try again")
        }
        
        
    }, [idTobeDeleted, bookTitleToBeDeleted])    

    useEffect(() => {
      if(!active || !account) return setMyBooks(null)

      const filteredMyBook = bookState.filter((book:BookType) => book.ownerAddress === account)
      setMyBooks(filteredMyBook)
    }, [active, account, bookState])
    
    

    return (
        <Fragment>
            <Head>
                <title>Books</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="min-h-fit container mx-auto mt-12 px-4 sm:px-0">
                <div className="flex gap-6 border-b-2">
                    <button
                        onClick={() => router.push(`/?tab=${tabs.allBooks}`)}
                        id="allbooks"
                        className={clsx({
                            "border-b-4 border-black":
                                String(tab).toLowerCase() !== tabs.myBooks
                        })}
                    >
                        All Books
                    </button>
                    <button
                        onClick={() => router.push(`/?tab=${tabs.myBooks}`)}
                        id="allbooks"
                        className={clsx({
                            "border-b-4 border-black":
                            String(tab).toLowerCase() === tabs.myBooks
                        })}
                    >
                        My Books
                    </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mt-8 mb-16 h-[75vh] overflow-auto">
                    {String(tab).toLocaleLowerCase() === tabs.myBooks && (
                        myBooks?.length ? myBooks.map((book, index) => <Book key = {index} {...book} onDeleteClick = {setIdTobeDeleted} />) : <p className="text-center col-span-4 mt-8 text-xl text-gray-400">You have not created any book</p>
                    )}
                    {String(tab).toLocaleLowerCase() !== tabs.myBooks && (
                        bookState.length ? bookState.map((book, index) => <Book key = {index} {...book} onDeleteClick = {setIdTobeDeleted} />) : <p className="text-center col-span-4 mt-8 text-xl text-gray-400">No Books to display</p>
                    )}
                </div>
            </main>

            <DeleteModal
                open = {!!idTobeDeleted && !!bookTitleToBeDeleted}
                onClose = {() => setIdTobeDeleted(null)}
                label = {"delete confirmation"}
                bookTitle = {bookTitleToBeDeleted}
                deleteHandler = {deleteBook}
            />
        </Fragment>
    );
};

export const getServerSideProps = async (context: any) => {
    const host = context.req.headers.host;
    const booksEndpoint = host.startsWith('localhost') || host.startsWith('192') ? `http://${host}/api/books` : `https://${host}/api/books`;
    const res = await fetch(booksEndpoint);
    const parsedResponse = await res.json();
    
    return {props: {books: parsedResponse.books}}
}

export default Home;
