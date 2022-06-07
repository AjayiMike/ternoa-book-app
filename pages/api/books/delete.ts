import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnection from "../../../db/connection";
import Book from "../../../db/book";
import { Book as BookType } from "../../../types/apiData";

type Data = {
  message?: string;
  id?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "DELETE") return res.status(405);

  const passedBody = JSON.parse(req.body);

  const { id } = passedBody;

  if (!id )
    return res.status(400).json({ message: "please specify the id of the book to be deleted" });

  await dbConnection(async (err: any) => {
    if (err)
      return res
        .status(500)
        .json({ message: "error connecting to the database" });

    try {
      const deletedBook = await Book.findByIdAndDelete(id)
      await mongoose.connection.close();
      return res.status(200).json({ id: deletedBook._id });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "something went wrong, cannot delete book from the database",
        });
    }
  });
}
