export const shortenText = (text: string, charLength: number): string => {
    return text.substring(0, charLength) + "...";
}