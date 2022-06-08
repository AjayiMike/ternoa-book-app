import {
    FC,
    Fragment,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import ConnectModal from "./connectModal";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEagerConnect } from "../web3";

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    const [openWalletModal, setOpenWalletModal] = useState(false);

    useEagerConnect()
    

    return (
        <Fragment>
            <Header openWalletModal={() => setOpenWalletModal(true)} />
            {children}
            <Footer />

            <ConnectModal
                open={openWalletModal}
                onClose={() => setOpenWalletModal(false)}
                label={"connect wallet modal"}
            />

            <ToastContainer
                position="bottom-right"
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Fragment>
    );
};

export default Layout;
