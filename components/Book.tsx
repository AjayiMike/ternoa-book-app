import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { shortenText } from "../utils/helpers";
import {FaRegEye} from 'react-icons/fa'
import {AiOutlineEdit} from 'react-icons/ai'
import {IoTrashOutline} from 'react-icons/io5'

interface Props {
    imgUri: string;
    title: String;
    description: string;
}
const Book: FC<Props> = ({ description, imgUri, title }) => {
    return (
        <div className="w-full p-4 sm:p-6 rounded-md shadow-lg grid grid-cols-12 gap-4 h-52 md:h-56 bg-slate-100 align-bottom hover:shadow-xl transition-all border-l-4 border-gray-400 relative">
            <div className="relative w-full h-full rounded col-span-5 lg:col-span-4">
                <Image
                    src={imgUri}
                    layout="fill"
                    className="rounded"
                />
            </div>
            <div className="col-span-7 lg:col-span-8">
                <h2 className="font-black text-xl md:text-2xl lg:text-3xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-300">{title}</h2>
                <p className="text-sm md:text-base">{shortenText(description, 80)}</p>
                <div className="absolute bottom-6 right-6 flex items-center">
                    <Link href = "/item/details/id">
                        <a>
                            <FaRegEye className="mr-8 cursor-pointer" />
                        </a>
                    </Link>
                    <Link href = "/item/edit/id">
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
    );
};

export default Book;
