export const queries = (req: Request) => {
    const query = new URL(req.url).searchParams;
    const limit = Number(query.get("limit")) || 5;
    const page = Number(query.get("page")) || 1;
    const search = query.get("search") || "";

    const otherQueries: { [key: string]: string } = {};
    query.forEach((value, key) => {
        if (key !== "limit" && key !== "page") {
            otherQueries[key] = value;
        }
    });
    
    return { limit, page, search, otherQueries };
}