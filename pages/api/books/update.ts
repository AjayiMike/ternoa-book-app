import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../db/connection";
import Book from "../../../db/book";
import { Book as BookType } from "../../../types/apiData";

type Data = {
  message?: string;
  book?: BookType

};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) =>  {
  if (req.method !== "PUT") return res.status(405);
  

  const passedBody = JSON.parse(req.body);

  const { id, title, description, ipfsPath } = passedBody;

  if (!id || !title || !description || !ipfsPath)
    return res.status(400).json({ message: "incomplete data" });
    
    const book = {
      title,
      description,
      coverImageIpfsPath: ipfsPath,
    };

    try {
      const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
      return res.status(200).json({ book: updatedBook });
    } catch (error) {
      console.log("error: ", error);
      return res
        .status(500)
        .json({
          message: "something went wrong, cannot update book",
        });
    }
}

export default connectDB(handler);
