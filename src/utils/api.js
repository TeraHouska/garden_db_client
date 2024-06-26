
const API_URL = "http://localhost:8080";

async function fetchData(url, requestOptions) {
    const apiUrl = `${API_URL}${url}`;

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    return data;
}

export function apiGet(url) {

    const requestOptions = {
        method: "GET",
    };

    return fetchData(url, requestOptions);
}