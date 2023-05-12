import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authHostConfig = config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
  return config;
};

const refreshToken = async () => {
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

const authHostError = async (error) => {
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

export { $host, $authHost };
