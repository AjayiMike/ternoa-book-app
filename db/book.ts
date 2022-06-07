import mongoose from "mongoose";
const {Schema, model} = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    coverImageIpfsPath: {
        type: String,
        required: true,
    },
    ownerAddress: {
        type: String,
        required: true,
    }
})

export default mongoose.models.book || model("book", bookSchema)