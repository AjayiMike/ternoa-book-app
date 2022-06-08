import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { Book } from "../../../types/apiData";

const BookDetails = () => {

    const router = useRouter()

    const { id } = router.query;

    const [book, setBook] = useState<Book | null>(null);


    const init = async () => {
        try {
            const bookRes = await fetch(`/api/books/${id}`);
            if (bookRes.status !== 200) return router.push("/");
            const parsedRes = await bookRes.json();
            setBook(parsedRes.book);
        } catch (error) {
            console.error(error);
            return router.push("/")
        }
    };

    useEffect(() => {
      init()
    }, [id])
    

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
            <div className="container mx-auto">
                <div className="relative bottom-12 flex">
                    <div className="relative left-4 sm:left-0 w-32 h-40 md:w-44 md:h-52 rounded-2xl border-4 border-white">
                        <Image
                            src={`https://gateway.ipfs.io/ipfs/${book?.coverImageIpfsPath}`}
                            layout="fill"
                            className="rounded-2xl"
                        />
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
                    <div className="flex items-center ml-auto mt-16 w-24">
                    <Link href = "/book/edit/id">
                        <a>
                            <AiOutlineEdit className="mr-8 cursor-pointer" />
                        </a>
                    </Link>
                    <button>
                        <IoTrashOutline className = "cursor-pointer" />
                    </button>
                </div>
                </div>
            </div>
        </main>
    );
};
export default BookDetails;
