import { useCallback, useEffect, useState } from "react"
import { CgCloseR } from "react-icons/cg"
import CustomModalWrapper from "./customModalWrapper"
import { toast } from 'react-toastify';
import { NextPage } from "next";

interface Props {
    open: boolean,
    onClose: ()=>void,
    label:string,
    bookTitle: string | null,
    deleteHandler: () => void,
}

const DeleteModal:NextPage<Props> = ({open, onClose, label, bookTitle, deleteHandler}) => {

    const [inputValue, setInputValue] = useState<string>("")

    const handleDelete = useCallback(async (e: any) => {
        e.preventDefault();
        if(inputValue !== bookTitle)
            return toast("type in the title correctly")
        deleteHandler()
        setInputValue("");
        
    },[inputValue, bookTitle])
    

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
            <form className="mt-4" onSubmit={handleDelete}>
                <p className="text-white mb-7">To confirm delete, please type <code className="bg-gray-600 p-1 rounded-sm">{bookTitle}</code> in the input below</p>
                <input type = "text" className="w-full py-2 px-3 block mt-4" value={inputValue} onChange = {(e:any) => setInputValue(e.target.value)} autoFocus/>
                <button className="w-full p-3 block bg-gradient-to-r from-red-500 to-orange-300 rounded text-white mt-4">Confirm delete</button>
            </form>
    </CustomModalWrapper>
  )
}

export default DeleteModal