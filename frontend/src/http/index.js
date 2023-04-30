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

const authHostError = async (error) => {
  if (error.response.status === 401) {
    const refresh = localStorage.getItem("refresh");
    if (refresh === null) {
      return Promise.reject(error);
    }

    await $host.post("api/token/refresh/", {
      refresh: refresh,
    })
      .then(response => {
        localStorage.setItem("access", response.data.access);
      })
      .catch(error => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      });
  }
};

$authHost.interceptors.request.use(authHostConfig);

$authHost.interceptors.response.use(undefined, authHostError);

export {
  $host,
  $authHost,
};
