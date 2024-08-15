
const API_URL = "http://localhost:8080";

export class HttpRequestError extends Error {
    constructor(response) {
        super(`Network response was not ok: ${response.status} ${response.statusText}`);
        this.response = response;
    }
}

async function fetchData(url, requestOptions) {
    const apiUrl = `${API_URL}${url}`;
    const allRequestOptions = {credentials: "include", ...requestOptions};

    const response = await fetch(apiUrl, allRequestOptions);
    if (allRequestOptions.method !== "DELETE" && response.status !== 401) {
        const data = await response.json();
        return data;
    }
    return null;
}

export function apiGet(url) {

    const requestOptions = {method: "GET"};

    return fetchData(url, requestOptions);
}

export function apiPost(url, data) {

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };

    return fetchData(url, requestOptions)
}

export function apiPut(url, data) {

    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };

    return fetchData(url, requestOptions)
}

export function apiDelete(url) {

    const requestOptions = {method: "DELETE"};

    return fetchData(url, requestOptions);
}