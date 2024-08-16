
const months = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];

// converts date format [y,m,d] to string "d. month"

export function dateToString(date) {
    return `${date[2]}. ${months[date[1] - 1]}`;
}

// convert ISO date format to array object [yyyy, MM, dd]

export function isoToArray(isoDate) {
    return isoDate.split("-").map((item) => parseInt(item));
}

// convert array object [yyyy, MM, dd] to ISO date format

export function arrayToIso(arrayDate) {
    return new Date(arrayDate[0], arrayDate[1]-1, arrayDate[2]+1).toISOString().split("T")[0];
}
