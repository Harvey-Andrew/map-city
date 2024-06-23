import { ref } from "vue";
import { defineStore } from "pinia";

export const useCityStore = defineStore("city", () => {
  function getDefaultCity() {
    let city = ref("北京");
    let currentCity = localStorage.getItem("currentCity");
    if (currentCity) {
      city.value = currentCity;
    }
    console.log(city);
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
