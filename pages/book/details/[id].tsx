import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

const BookDetails = () => {

    return (
        <main className="min-h-fit sm:px-0">
            <div className="relative w-full h-32 md:h-44 bg-gradient-to-r from-orange-300 to-red-500 flex justify-center items-center">
                <div className="mb-8 md:mb-0">
                    <span>title: </span>
                    <h1 className="text-xl md:text-3xl font-black uppercase">
                        Book title here
                    </h1>
                </div>
            </div>
            <div className="container mx-auto">
                <div className="relative bottom-12 flex">
                    <div className="relative left-4 sm:left-0 w-32 h-40 md:w-44 md:h-52 rounded-2xl border-4 border-white">
                        <Image
                            src={`https://source.unsplash.com/random/50×50/?book`}
                            layout="fill"
                            className="rounded-2xl"
                        />
                    </div>

                    <div className="mt-auto ml-10">
                        <p className="font-bold text-base">
                            <span className="font-light">Owned by: </span>You
                        </p>
                        <p className="font-bold text-base">
                            <span className="font-light">Created on: </span>23
                            October 2009
                        </p>
                    </div>
                </div>
                <div className="px-4 sm:px-0 mb-16 relative">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Pariatur aliquam tenetur, odit voluptatum quos
                        repudiandae facere provident in accusantium quae tempore
                        quas praesentium saepe eveniet dicta nulla itaque optio
                        perspiciatis deserunt expedita aperiam? Aliquid id nihil
                        nemo incidunt in aut explicabo, facere recusandae quis
                        accusamus deleniti voluptate ea ad laborum porro ut,
                        saepe?
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
