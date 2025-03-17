export const GetImage = (Key: string) => {
    if (!Key) return "";
    const extension = Key.split(".").length > 1;
    return "https://media.allcapz.in/" + Key + (extension ? "" : ".avif");
}