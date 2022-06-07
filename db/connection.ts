import mongoose from "mongoose";



export default async (cb: (err: any) => void) => {
   return mongoose.connect(process.env.db_connection_string as string, cb)
}