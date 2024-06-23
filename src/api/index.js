import axios from "axios";
const env = import.meta.env;
const key = env.VITE_TOKEN;
/* 请求拦截 */
axios.interceptors.request.use((config) => {
  let url = config.url;
  if (url.startsWith("/map") && url.includes("?")) {
    config.url = `${url}&key=${key}`;
  } else if (url.startsWith("/map")) {
    config.url = `${url}?key=${key}`;
  }
  return config;
});

/* 响应拦截 */
axios.interceptors.response.use((config) => {
  return config.data;
});
const getCityHttp = () => {
  return axios({
    url: "/api/city",
  });
};
const getIpMapHttp = () => {
  return axios({
    url: "/map/ip",
  });
};
const getWeatherMapHttp = (city) => {
  return axios({
    url: `/map/weather/weatherInfo?city=${city}`,
  });
};
const getLocationByCityHttp = (city) => {
  return axios({
    url: `/map/geocode/geo?address=${city}`,
  });
};
export { getCityHttp, getIpMapHttp, getWeatherMapHttp, getLocationByCityHttp };
