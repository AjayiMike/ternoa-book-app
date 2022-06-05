import { FC } from "react"
import { CgCloseR } from "react-icons/cg"
import CustomModalWrapper from "./customModalWrapper"

interface Props {
    open: boolean,
    onClose: ()=>void,
    label:string
}

const DeleteModal:FC<Props> = ({open, onClose, label}) => {
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
                    <span className="block text-sm font-light bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-300">this cannot be undone!</span>
                </div>
                <CgCloseR
                    className="cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <form className="mt-4">
                <p className="text-white">To confirm delete, please type <code className="bg-gray-600 px-2">book title </code> in the input below</p>
                <input type = "text" className="w-full py-1 px-3 block mt-4" autoFocus/>
                <button className="w-full py-1 px-3 block bg-gradient-to-r from-red-500 to-orange-300 p-2 rounded text-white mt-4">Confirm delete</button>
            </form>
    </CustomModalWrapper>
  )
}

export default DeleteModal