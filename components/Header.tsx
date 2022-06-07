import Link from "next/link";
import { FC } from "react";

interface Props {
    openWalletModal: () => void;
}
const Header:FC<Props> = ({openWalletModal}) => {
    return (
        <header className="bg-black text-white py-4">
            <div className="container mx-auto px-4 sm:px-0  flex justify-between items-center">
                <Link href="/">
                    <div className="cursor-pointer">
                        <span className="block font-black text-3xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-300">
                            ternoa
                        </span>
                        <i className="block text-gray-300 -mt-2">
                            tech. assessment
                        </i>
                    </div>
                </Link>

                <div className="flex justify-between gap-8 items-center">
                    <nav className="">
                        <ul className="flex gap-6">
                            <li>
                                <Link href="/">
                                    <a>home</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/book/create">
                                    <a>create</a>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="fixed bottom-0 left-0 bg-black w-full py-2 px-6 z-50 flex justify-end sm:block sm:static sm:px-0">
                        <button onClick={openWalletModal} className="bg-gradient-to-r from-red-500 to-orange-300 px-6 py-2 rounded-full">
                            connect wallet
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
