/**
 * @FilePath     : /map-city/src/stores/city.js
 * @Description  :  获得城市数据
 * @Author       : Harvey-Andrew
 * @Version      : 0.0.1
 * @LastEditors  : Harvey-Andrew 
 * @LastEditTime : 2024-06-24 01:42:56
 * @Copyright © 2024 by Harvey-Andrew  .
 */



import { ref } from "vue";
import { defineStore } from "pinia";

export const useCityStore = defineStore("city", () => {
  function getDefaultCity() {
    let city = ref("北京");
    let currentCity = localStorage.getItem("currentCity");
    if (currentCity) {
      city.value = currentCity;
    }
    // console.log(city);
    return city;
  }

  const city = getDefaultCity();
  const changeCity = (val) => {
    city.value = val;

    // 缓存城市
    localStorage.setItem("currentCity", val);
  };
  return {
    city,
    changeCity,
  };
});
