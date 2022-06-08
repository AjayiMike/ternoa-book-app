import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect } from "../web3";

export const getLibrary = (provider: any) => {
    return new Web3Provider(provider);
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Web3ReactProvider>
    );
}

export default MyApp;
