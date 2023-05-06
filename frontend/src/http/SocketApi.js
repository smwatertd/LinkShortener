import { $host, $authHost } from "./index";

export const fetchFullUrl = async (props) => {
  const response = $host.get(`api/${props.shortUrl}/`);
  return response;
};

export const fetchSockets = async () => {
  const response = await $authHost.get("api/v1/users/");
  return response;
};

export const createSocket = async ({full_url, isAuth}) => {
  const host = isAuth ? $authHost : $host;
  const response = await host.post("api/v1/sockets/", {full_url});
  return response;
};

export const deleteSocket = async ({shortUrl}) => {
  const response = await $authHost.delete(`api/v1/sockets/${shortUrl}/`);
  return response;
};
