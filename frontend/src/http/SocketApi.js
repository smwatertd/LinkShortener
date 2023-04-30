import { $host, $authHost } from "./index";

export const fetchFullUrl = async (props) => {
  const response = $host.get("api/" + props.shortUrl);
  return response;
};

export const fetchSockets = async () => {
  const response = await $authHost.get("api/v1/users/");
  return response;
};

export const createSocket = async (props) => {
  const response = await $host.post("api/v1/sockets/", props);
  return response;
};

export const createUserSocket = async (props) => {
  const response = await $authHost.post("api/v1/sockets/", props);
  return response;
};
