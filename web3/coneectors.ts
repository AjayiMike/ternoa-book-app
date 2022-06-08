import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import {
    Metamask,
    TrustWallet,
    WalletConnect,
} from "../components/icons";

// Not connecting to any network in particular
export const injected = new InjectedConnector({});
const walletConnect = new WalletConnectConnector({
    qrcode: true,
});

export const connectorsData = [
    {
        name: "Metamask",
        connector: injected,
        icon: Metamask,
    },
    {
        name: "Trust Wallet",
        connector: injected,
        icon: TrustWallet,
    },
    {
        name: "Wallet Connect",
        connector: walletConnect,
        icon: WalletConnect,
    },
];