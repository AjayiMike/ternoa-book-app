import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { shortenText } from "../utils/helpers";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { Book as BookType } from "../types/apiData";
import { useWeb3React } from "@web3-react/core";

interface Props extends BookType {
    onDeleteClick: Dispatch<SetStateAction<string | null>>;
}
const Book: FC<Props> = ({
    description,
    coverImageIpfsPath,
    title,
    _id,
    onDeleteClick,
    ownerAddress,
}) => {
    const { account } = useWeb3React();
    return (
        <div className="w-full p-4 sm:p-6 rounded-md shadow-lg grid grid-cols-12 gap-4 h-52 md:h-56 bg-slate-100 align-bottom hover:shadow-xl transition-all border-l-4 border-gray-400 relative">
            <div className="relative w-full h-full rounded col-span-5 lg:col-span-4">
                <Image
                    src={`https://gateway.ipfs.io/ipfs/${coverImageIpfsPath}`}
                    layout="fill"
                    className="rounded"
                    alt = "book cover"
                />
            </div>
            <div className="col-span-7 lg:col-span-8">
                <h2 className="font-black text-xl md:text-2xl lg:text-3xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-300">
                    {title}
                </h2>
                <p className="text-sm md:text-base">
                    {shortenText(description, 80)}
                </p>
                <div className="absolute bottom-6 right-6 flex items-center">
                    <Link href={`/book/details/${_id}`}>
                        <a>
                            <FaRegEye className="mr-8 cursor-pointer" />
                        </a>
                    </Link>
                    {account && account === ownerAddress && (
                        <Link href={`/book/edit/${_id}`}>
                            <a>
                                <AiOutlineEdit className="mr-8 cursor-pointer" />
                            </a>
                        </Link>
                    )}
                    {account && account === ownerAddress && (
                        <button onClick={() => onDeleteClick(_id)}>
                            <IoTrashOutline className="cursor-pointer" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Book;
