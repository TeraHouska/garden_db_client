
const months = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec"];

export function dateToString(date) {
    return `${date[2]}. ${months[date[1] - 1]}`;
}