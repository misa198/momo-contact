import axios from 'axios';
import { Base64 } from 'js-base64';

const instance = axios.create({});

const setCache = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getCache = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

instance.interceptors.request.use((config) => {
  // do something
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const {
      config: { url },
    } = response;
    const key = Base64.encode(String(url));
    setCache(key, response);
    return response;
  },
  (error) => {
    // if offline, get data from cache and return
    // check if error is offline
    const { code, message, response } = error;

    if (
      error.config.method === 'get' &&
      response === undefined &&
      (code === 'ECONNABORTED' || message === 'Network Error')
    ) {
      return getCache(Base64.encode(String(error.config.url)));
    }
    return Promise.reject(error);
  },
);

export default instance;
