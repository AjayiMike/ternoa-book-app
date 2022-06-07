import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnection from "../../../db/connection";
import Book from "../../../db/book";
import { Book as BookType } from "../../../types/apiData";

type Data = {
  message?: string;
  book?: BookType

};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "PUT") return res.status(405);

  const passedBody = JSON.parse(req.body);

  const { id, title, description, ipfsPath, ownerAddress } = passedBody;

  if (!id || !title || !description || !ipfsPath || !ownerAddress)
    return res.status(400).json({ message: "incomplete data" });

  await dbConnection(async (err: any) => {
    if (err)
      return res
        .status(500)
        .json({ message: "error connecting to the database" });

    const book = {
      title,
      description,
      coverImageIpfsPath: ipfsPath,
      ownerAddress,
    };

    try {
      const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
      mongoose.connection.close();
      return res.status(200).json({ book: updatedBook });
    } catch (error) {
      console.log("error: ", error);
      return res
        .status(500)
        .json({
          message: "something went wrong, cannot update book",
        });
    }
  });
}
