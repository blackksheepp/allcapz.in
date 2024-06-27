export const GetImage = (Key: string) => {
    if (!Key) return "";
    const extension = Key.split(".").length > 1;
    return "https://d3lqxujayvqlsx.cloudfront.net/" + Key + (extension ? "" : ".avif");
}