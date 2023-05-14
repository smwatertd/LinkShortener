import { $host } from "./index.host";
import { $authHost } from "./index.authHost";

export const fetchFullUrl = async ({shortUrl}) => {
  const response = $host.get(`api/${shortUrl}/`);
  return response;
};

export const fetchSockets = async ({page, pageSize}) => {
  const response = await $authHost.get("api/v1/users/", {
    params: {
      page: page,
      page_size: pageSize,
    },
  });
  return response;
};

export const createSocket = async ({isAuth, fullUrl}) => {
  const host = isAuth ? $authHost : $host;
  const response = await host.post("api/v1/sockets/", {
    full_url: fullUrl,
  });
  return response;
};

export const deleteSocket = async ({shortUrl}) => {
  const response = await $authHost.delete(`api/v1/sockets/${shortUrl}/`);
  return response;
};
