<template>
  <div>
    <button id="location" @click="goCity">
      <i class="iconfont icon-weizhi"></i> {{ $store.city }} ---
      {{ currentWeather }}
    </button>
    <OpenMap />
    <Popup :isShow="isShow" @close="close" @toggle="toggleCity" />
  </div>
</template>

<script setup>
import { getIpMapHttp, getLocationByCityHttp } from "@/api";
import { useCityStore } from "@/stores/city";
import { onMounted, ref, getCurrentInstance, watch } from "vue";
import { useRouter } from "vue-router";
import OpenMap from "./components/OpenMap.vue";
import Popup from "./components/Popup.vue";
import { useGeoLocationHook } from "./hooks/useGeoLocationHook";
const $router = useRouter();
const $store = useCityStore();
const isShow = ref(false);
// console.log($store);
// 跳转到city
const goCity = () => {
  $router.push("/city");
};

/* 
1.ip定位
ip === pinia popup不会出现
ip !== pinia pop会出现
*/

onMounted(() => {
  getIpMapHttp().then((res) => {
    // console.log(res.city.replace("市", ""));
    let ipCity = res.city.replace("市", "");
    let currentCity = $store.city;
    if (ipCity !== currentCity) {
      isShow.value = true;
    } else {
      isShow.value = false;
    }
  });
});

const close = () => {
  isShow.value = false;
};

/*  
1.获取pinia中的数据
2.加载geojson数据
3.获取定位的城市
*/
let $map = null;
const currentWeather = ref("");
onMounted(async () => {
  let { proxy } = getCurrentInstance();
  $map = proxy.$map;

  let { weather } = await useGeoLocationHook({
    map: $map,
  });
  watch(weather, (val) => {
    // console.log(val);
    currentWeather.value = val;
  });
});

const toggleCity = async (city) => {
  $store.changeCity(city);
  isShow.value = false;
  // console.log(location);
  let { weather } = await useGeoLocationHook({
    map: $map,
  });
  watch(weather, (val) => {
    // console.log(val);
    currentWeather.value = val;
  });
};
</script>

<style scoped>
#location {
  width: 180px;
  height: 40px;
  background-color: #6528df;
  border: none;
  border-radius: 15px;
  top: 20px;
  left: 50px;
  position: fixed;
  z-index: 1000;
  color: #fff;
}
#location:hover {
  cursor: pointer;
  color: #eee;
}
</style>
