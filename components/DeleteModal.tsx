import { FC, useContext, useEffect, useState } from "react"
import { CgCloseR } from "react-icons/cg"
import { AppContext } from "../contexts/appContext"
import { Book } from "../types/apiData"
import CustomModalWrapper from "./customModalWrapper"

interface Props {
    open: boolean,
    onClose: ()=>void,
    label:string
}

const DeleteModal:FC<Props> = ({open, onClose, label}) => {

const {books, seletedBookId} = useContext(AppContext)

const [book, setBook] = useState<Book | null>()

useEffect(() => {
  const book = books.find(book => book._id === seletedBookId)
  setBook(book)
}, [seletedBookId])

  return (
    <CustomModalWrapper
        label={label}
        open={open}
        onClose={onClose}
    >
        <div className="flex justify-between items-center text-white font-semibold text-xl">
                <div>
                    <h2 className="">
                        Delete Book
                    </h2>
                    <span className="block text-base font-light bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-300">this cannot be undone!</span>
                </div>
                <CgCloseR
                    className="cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <form className="mt-4">
                <p className="text-white mb-7">To confirm delete, please type <code className="bg-gray-600 p-1 rounded-sm whitespace-nowrap">{book?.title}</code> in the input below</p>
                <input type = "text" className="w-full py-2 px-3 block mt-4" autoFocus/>
                <button className="w-full p-3 block bg-gradient-to-r from-red-500 to-orange-300 rounded text-white mt-4">Confirm delete</button>
            </form>
    </CustomModalWrapper>
  )
}

export default DeleteModal