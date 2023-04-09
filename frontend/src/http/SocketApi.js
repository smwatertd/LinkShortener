import { $host, $authHost } from "./index";

export const createSocket = async (full_url) => {
    const response = await $host.post("api/v1/sockets/", {full_url});
    return response;
};

export const createAuthSocket = async (full_url) => {
    const response = await $authHost.post("api/v1/sockets/", {full_url});
    return response;
};

export const fetchFullUrl = async (shortUrl) => {
    const response = await $host.get("api/" + shortUrl);
    return response;
};
