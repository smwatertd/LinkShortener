import { $host } from "./index.host";
import { $authHost } from "./index.authHost";

export const fetchFullUrl = async ({shortUrl}) => {
  // Получение полного URL по короткому URL
  // shortUrl - короткий URL сокета
  const response = $host.get(`api/${shortUrl}/`);
  return response;
};

export const fetchSockets = async ({page, pageSize}) => {
  // Получение сокетов пользователя
  // page - страница
  // pageSize - количество сокетов на странице
  const response = await $authHost.get("api/v1/sockets/", {
    params: {
      page: page,
      page_size: pageSize,
    },
  });
  return response;
};

export const createSocket = async ({isAuth, fullUrl}) => {
  // Создание сокета по полному URL
  // isAuth - авторизованность пользователя
  // fullUrl - полный URL сокета
  const host = isAuth ? $authHost : $host;
  const response = await host.post("api/v1/sockets/", {
    full_url: fullUrl,
  });
  return response;
};

export const deleteSocket = async ({shortUrl}) => {
  // Удаление сокета
  // shortUrl - короткий URL сокета
  const response = await $authHost.delete(`api/v1/sockets/${shortUrl}/`);
  return response;
};
