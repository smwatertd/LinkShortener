import { $authHost, $host } from "./index";

export const registration = async (username, email, password) => {
    const promise = await $host.post("auth/users/", {username, email, password});
    return promise;
};

export const login = async (username, password) => {
    const response = await $host.post("api/token/", {username, password});
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
};

export const logOut = async () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};

export const fetchUserSockets = async () => {
    const response = await $authHost.get("api/v1/users/");
    return response;
};

export const refresh = async () => {

};
