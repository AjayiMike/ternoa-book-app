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
) => {
  if (req.method !== "POST")
    return res.status(405);

  const passedBody = JSON.parse(req.body);

  const { title, description, ipfsPath, ownerAddress } = passedBody;

  if (!title || !description || !ipfsPath || !ownerAddress)
    return res.status(400).json({ message: "incomplete data" });

    const book = new Book({
      title,
      description,
      coverImageIpfsPath: ipfsPath,
      ownerAddress,
    });

    try {
      const savedBook:BookType = await book.save()
      return res.status(200).json({ book: savedBook });
    } catch (error) {
      return res.status(500).json({message: "something went wrong, cannot save book to the database"})
    }
      
}

export default connectDB(handler);
