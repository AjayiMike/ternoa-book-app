import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./coneectors";

export const useEagerConnect = () => {
    const { active, activate } = useWeb3React();
    const [triedEagerConnect, setTriedEagerConnect] = useState(false);

    useEffect(() => {
        injected
            .isAuthorized()
            .then((isAuthorized) => {
                if (isAuthorized) activate(injected);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setTriedEagerConnect(true);
            });
    }, [activate]);

    useEffect(() => {
        if (!triedEagerConnect && active) setTriedEagerConnect(true);
    }, [triedEagerConnect, active]);

    return triedEagerConnect;
};