import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import { Book } from "../../../types/apiData";
import ErrorPage from 'next/error'

const BookDetails = () => {

    const router = useRouter()

    const { id } = router.query;

    const [book, setBook] = useState<Book | null>(null);

    const [error, setError] = useState<{statusCode: number | null, isError:boolean}>({statusCode: null, isError: false})


    const init = useCallback(async () => {
        if(!id) return;
        try {
            const bookRes = await fetch(`/api/books/${id}`);
        
            if (bookRes.status !== 200) return setError({
                isError: true,
                statusCode: bookRes.status
            })
            const parsedRes = await bookRes.json();
            if(parsedRes.book === null) return setError({
                isError: true,
                statusCode: 404
            })
            setBook(parsedRes.book);
        } catch (error) {
            return setError({
                isError: true,
                statusCode: 500
            })
        }
    }, [id]);

    useEffect(() => {
      init()
    }, [id])

    if(error.isError) return <ErrorPage statusCode={error.statusCode as number} />
    

    return (
        <main className="min-h-fit sm:px-0">
            <div className="relative w-full h-32 md:h-44 bg-gradient-to-r from-orange-300 to-red-500 flex justify-center items-center">
                <div className="mb-8 md:mb-0">
                    <span>title: </span>
                    <h1 className="text-xl md:text-3xl font-black uppercase">
                        {book?.title}
                    </h1>
                </div>
            </div>
            {<div className="container mx-auto">
                <div className="relative bottom-12 flex">
                    <div className="relative left-4 sm:left-0 w-40 h-44 md:w-52 md:h-56 rounded-2xl border-4 border-white">
                        {book?.coverImageIpfsPath && <Image
                            src={`https://gateway.ipfs.io/ipfs/${book?.coverImageIpfsPath}`}
                            layout="fill"
                            className="rounded-2xl"
                        />}
                    </div>

                    <div className="mt-auto ml-10">
                        <p className="font-bold text-base">
                            <span className="font-light">Owned by: </span>{book?.ownerAddress}
                        </p>
                        <p className="font-bold text-base">
                            <span className="font-light">Created on: </span>23
                            October 2009
                        </p>
                    </div>
                </div>
                <div className="px-4 sm:px-0 mb-16 relative">
                    <p>
                        {book?.description}
                    </p>
                    <div className="mt-12">
                    <Link href = {`/book/edit/${book?._id}`}>
                        <a>
                            <AiOutlineEdit className="cursor-pointer text-3xl" />
                        </a>
                    </Link>
                </div>
                </div>
            </div>}
        </main>
    );
};
export default BookDetails;
