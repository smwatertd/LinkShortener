import { $host } from "./index.host";

export const check = async () => {
  let refresh = localStorage.getItem("refresh");
  refresh = refresh === null ? 0 : refresh;
  const response = await $host.post("api/token/verify/", {
    token: refresh,
  });
  return response;
};

export const logIn = async ({username, password}) => {
  const response = await $host.post("api/token/", {
    username,
    password,
  });
  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  return response;
};

export const logOut = () => {
  const items = [
    "access",
    "refresh",
    "fullUrl",
    "shortUrl",
  ];
  items.forEach(item => localStorage.removeItem(item));
};

export const registration = async ({email, username, password}) => {
  const response = await $host.post("api/v1/users/", {
    email,
    username,
    password,
  });
  return response;
};
