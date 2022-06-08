import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../db/connection";
import Book from "../../../db/book";
import { Book as BookType } from "../../../types/apiData";

type Data = {
    message?: string;
    book?: BookType;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    if (req.method !== "GET") return res.status(405);

    const { slug } = req.query;
    
    try {
        const book = await Book.findOne({ _id: slug });
        
        return res.status(200).json({ book });
    } catch (error) {        
        return res
            .status(500)
            .json({ message: "something went wrong, cannot get books" });
    }
};

export default connectDB(handler);
