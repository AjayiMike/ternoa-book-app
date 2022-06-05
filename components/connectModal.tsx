import { FC } from "react"
import CustomModalWrapper from "./customModalWrapper"
import {CgCloseR} from 'react-icons/cg'

interface Props {
    open: boolean,
    onClose: ()=>void,
    label:string
}
const ConnectModal:FC<Props> = ({open, onClose, label}) => {
  return (
    <CustomModalWrapper
        label={label}
        open={open}
        onClose={onClose}
    >
        <div className="flex justify-between items-center text-white-1 font-semibold text-xl">
                <h2 className="dark:text-white-1 text-dark-1">
                    Connect Wallet
                </h2>
                <CgCloseR
                    className="cursor-pointer dark:text-white-1 text-dark-1"
                    onClick={onClose}
                />
            </div>
            <div className="">
                <div
                    className={`text-gray-6 p-2 rounded md:rounded-xl w-full mt-2 mb-4 text-left`}
                >
                    <span className="text-base md:text-base">
                        <span>
                            By connecting a wallet, you have agreed to chained
                            thrift's{" "}
                        </span>
                        <span>
                            <a href="#!" className="text-blue-1">
                                terms of service
                            </a>
                        </span>
                    </span>
                </div>
                {/* {connectorsData.map((connectorObj, idx) => {
                    const { name, connector, icon: Icon } = connectorObj;
                    return (
                        <button
                            key={idx}
                            className={clsx({
                                "bg-white-1 dark:bg-gray-5 text-white-1 p-2 rounded md:rounded-xl block w-full mt-4 text-left align-middle": true,
                                "opacity-60 cursor-not-allowed": false,
                            })}
                            onClick={() => connectWallet(connector)}
                        >
                            <Icon width="35px" className="inline-block mr-6" />
                            <span
                                className={`inline-block text-base dark:text-white-1 text-dark-1`}
                            >
                                {name}
                            </span>
                        </button>
                    );
                })} */}
            </div>
    </CustomModalWrapper>
  )
}

export default ConnectModal