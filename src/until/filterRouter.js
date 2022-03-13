export const filterRouter = (routes) => {
    return routes.filter((item) => item.parent)
}
