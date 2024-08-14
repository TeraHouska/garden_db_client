export function apiToHeading(type) {
    switch (type) {
        case "SOW_VEGETABLES":
            return "Sadba zeleniny";
        case "HERBS":
            return "Bylinky";
        case "REAP":
            return "Zelenina";
        case "SOULS":
            return "Dušičkové zboží";
        default: return "";
    }
}

export function apiToPath(type) {
    switch (type) {
        case "SOW_VEGETABLE":
            return "/sadba/zelenina";
        case "SOW_HERB":
            return "/sadba/bylinky";
        case "REAP":
            return "/sklizen";
        case "SOULS":
            return "/dusicky";
        default: return "";
    }
}