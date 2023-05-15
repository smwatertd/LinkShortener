import axios from "axios";

import { $host } from "./index.host";

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const refreshToken = async () => {
  // Обновление токена
  try {
    const refresh = localStorage.getItem("refresh");
    const response  = await $host.post("api/token/refresh/", {refresh});
    localStorage.setItem("access", response.data.access);
  } catch (error) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    throw error;
  }
};

const authHostConfig = config => {
  // Конфигурация перехватчика (interceptor) запросов для
  // авторизованного хоста (authHost)
  config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
  return config;
};

const authHostError = async (error) => {
  // Конфигурация перехватчика (interceptor) ответов на возникающую
  // ошибку для авторизованного хоста (authHost)
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._isRetry) {
    originalRequest._isRetry = true;
    await refreshToken();
    originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
    return axios(originalRequest);
  }

  return Promise.reject(error);
};

$authHost.interceptors.request.use(authHostConfig);
$authHost.interceptors.response.use(response => response, authHostError);

export { $authHost };
