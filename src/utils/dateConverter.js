
const months = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];

export function dateToString(date) {
    return `${date[2]}. ${months[date[1] - 1]}`;
}