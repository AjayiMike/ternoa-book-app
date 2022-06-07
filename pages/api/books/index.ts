import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnection from "../../../db/connection";
import Book from "../../../db/book";
import { Book as BookType } from "../../../types/apiData";

type Data = {
  message?: string;
  books?: BookType[]

};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET")
    return res.status(405);

  await dbConnection(async (err: any) => {
    if (err)
    return res.status(500).json({message: "error connecting to the database"})

    try {
      const books: BookType[] = await Book.find();
      await mongoose.connection.close()
      return res.status(200).json({ books });
    } catch (error) {
      return res.status(500).json({message: "something went wrong, cannot get books"})
    }
      
  });
}
