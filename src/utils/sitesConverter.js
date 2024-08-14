const siteTranslation = new Map([
    ["WEST", "západ"],
    ["NORTH", "sever"],
    ["SOUTH", "jih"],
    ["EAST", "východ"]
])

// translates site from API doc to czech

export function sitesToString(sites) {
    let mappedSites = sites.map((site) => siteTranslation.get(site));
    return mappedSites.join(", ");
}