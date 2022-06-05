import React, { FC, ReactNode } from 'react'
import Modal from "react-modal";
import clsx from "clsx";

interface Props {
    open: boolean,
    onClose: ()=>void,
    label:string
    children: ReactNode
}
Modal.setAppElement("#__next");
const CustomModalWrapper:FC<Props> = ({open, onClose, label, children}) => {
  return (
    <Modal
            closeTimeoutMS={300}
            isOpen={open}
            onRequestClose={onClose}
            contentLabel={label}
            overlayClassName="fixed inset-0 backdrop-blur-sm z-10"
            className="absolute w-80 md:w-96 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-black p-6 rounded-xl md:rounded-2xl"
        >
            {children}
        </Modal>
  )
}

export default CustomModalWrapper