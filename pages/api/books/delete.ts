import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../db/connection";
import Book from "../../../db/book";

type Data = {
  message?: string;
  id?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.method !== "DELETE") return res.status(405);

  const passedBody = JSON.parse(req.body);

  const { id } = passedBody;

  if (!id )
    return res.status(400).json({ message: "please specify the id of the book to be deleted" });


  try {
    const deletedBook = await Book.findByIdAndDelete(id)
    return res.status(200).json({ id: deletedBook._id });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "something went wrong, cannot delete book from the database",
      });
  }
}

export default connectDB(handler);
