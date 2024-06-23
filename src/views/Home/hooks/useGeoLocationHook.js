/*
 * @Author: Harvey-Andrew dongxiao5678@gmail.com
 * @Date: 2024-05-30 10:35:06
 * @LastEditors: Harvey-Andrew dongxiao5678@gmail.com
 * @LastEditTime: 2024-06-24 00:34:10
 * @FilePath: \vue3-map\src\views\Home\hooks\useGeoLocationHook.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { setAreaStyle } from "@/ol-utils";
import { getWeatherMapHttp } from "@/api";
import { useCityStore } from "@/stores/city";
import { watch, ref } from "vue";
export const useGeoLocationHook = ({ map, adcode, center }) => {
  const weather = ref("");
  const $store = useCityStore();
  /* map,adcode,center */
  /* 1、geojson数据加载 */
  /* 2、执行飞行视角 */
  map.getView().animate({
    center,
    zoom: 8,
    duration: 2000,
  });
  // 
  let url = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`;
  const layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url,
      format: new ol.format.GeoJSON(),
    }),
    style: setAreaStyle({}),
  });
  map.addLayer(layer);
  /* 设置天气数据 */
  getWeatherMapHttp($store.city).then((res) => {
    weather.value = res.lives[0].weather;
    /* 将值放到pinia */
  });
  return { weather };
};
