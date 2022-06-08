import { FC, useEffect } from "react"
import CustomModalWrapper from "./customModalWrapper"
import {CgCloseR} from 'react-icons/cg'
import { connectorsData } from "../web3";
import { useWeb3React } from "@web3-react/core";
import clsx from "clsx";

interface Props {
    open: boolean,
    onClose: ()=>void,
    label:string
}
const ConnectModal:FC<Props> = ({open, onClose, label}) => {

    const { active, activate } = useWeb3React();

    useEffect(() => {
        if (active) {
            console.log("Wallet connected")
            onClose();

        }
        // eslint-disable-next-line
    }, [active]);
  return (
    <CustomModalWrapper
        label={label}
        open={open}
        onClose={onClose}
    >
        <div className="flex justify-between items-center text-white- font-semibold text-xl">
                <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-300">
                    Connect Wallet
                </h2>
                <CgCloseR
                    className="cursor-pointer bg-clip-text bg-gradient-to-r text-red-400"
                    onClick={onClose}
                />
            </div>
            <div className="">
                {connectorsData.map((connectorObj, idx) => {
                    const { name, connector, icon: Icon } = connectorObj;
                    return (
                        <button
                            key={idx}
                            className={clsx({
                                "bg-slate-100 text-white-1 p-2 rounded md:rounded-xl block w-full mt-6 text-left align-middle": true,
                                "opacity-60 cursor-not-allowed": false,
                            })}
                            onClick={() => activate(connector)}
                        >
                            <Icon width="35px" className="inline-block mr-6" />
                            <span
                                className={`inline-block text-base text-black`}
                            >
                                {name}
                            </span>
                        </button>
                    );
                })}
            </div>
    </CustomModalWrapper>
  )
}

export default ConnectModal