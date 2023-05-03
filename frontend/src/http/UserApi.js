import { $host } from "./index";

export const check = async () => {
  const refresh = localStorage.getItem("refresh");
  const response = $host.post("api/token/verify/", {
    token: refresh === null ? 0 : refresh,
  });
  return response;
};

export const logIn = async (props) => {
  const response = await $host.post("api/token/", props);
  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  return response;
};

export const logOut = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const registration = async (props) => {
  const response = await $host.post("api/v1/users/", props);
  return response;
};
