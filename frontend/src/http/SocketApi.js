import { $host, $authHost } from "./index";

export const fetchFullUrl = async (props) => {
  const response = $host.get(`api/${props.shortUrl}/`);
  return response;
};

export const fetchSockets = async (props) => {
  const { page, pageSize } = props;
  const response = await $authHost.get("api/v1/users/", {
    params: {
      page: page,
      page_size: pageSize,
    },
  });
  return response;
};

export const createSocket = async (props) => {
  const { isAuth, fullUrl } = props;
  const host = isAuth ? $authHost : $host;
  const response = await host.post("api/v1/sockets/", {
    full_url: fullUrl,
  });
  return response;
};

export const deleteSocket = async (props) => {
  const { shortUrl } = props;
  const response = await $authHost.delete(`api/v1/sockets/${shortUrl}/`);
  return response;
};
