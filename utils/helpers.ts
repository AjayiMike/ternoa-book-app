export const shortenText = (text: string, charLength: number): string => {
    return text.substring(0, charLength) + "...";
}

export const shortenAddress = (address: string) => {
    if (!address) return null;
    return `${address.substr(0, 6)}...${address.substr(
        address.length - 4,
        address.length
    )}`;
};