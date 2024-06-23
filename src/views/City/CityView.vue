<template>
  <div class="container">
    <h3>当前城市</h3>
    <button>{{ $store.city }}</button>
    <h3>定位/最近访问</h3>
    <div>
      <button class="location" @click="handleItem('玉林')">
        <i class="iconfont icon-weizhi"></i> 玉林市
      </button>
      <button
        v-for="item of historyCities"
        :key="item"
        @click="handleItem(item)"
      >
        {{ item }}
      </button>
    </div>
    <h3>热门城市</h3>
    <div>
      <button
        v-for="item of hotCities"
        :key="item.id"
        @click="handleItem(item.name)"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { getCityHttp } from "@/api";
import { useCityStore } from "@/stores/city";
import { useRouter } from "vue-router";
const $store = useCityStore();
const $router = useRouter();
// console.log($store);
const hotCities = ref([]);
const historyCities = ref([]);
onMounted(async () => {
  let res = await getCityHttp();
  // console.log(res);
  hotCities.value = res.data.hotCities;
});
const handleItem = (name) => {
  // A-操作pinia
  $store.changeCity(name);

  // B-历史记录
  // 3-1 false unshift()
  let index = historyCities.value.indexOf(name);
  if (index === -1) {
    historyCities.value.unshift(name);
  } else {
    // 3-2 true splice unshift
    historyCities.value.splice(index, 1);
    historyCities.value.unshift(name);
  }

  // 限制历史记录的长度
  historyCities.value = historyCities.value.splice(0, 3);

  // C-回到city
  $router.back();
};

// 监听-设置缓存
watch(historyCities, (val) => {
  // console.log(val);
  localStorage.setItem("historyCities", JSON.stringify(val));
});

// 获取缓存
onMounted(() => {
  let res = JSON.parse(localStorage.getItem("historyCities"));
  if (res) {
    historyCities.value = res;
  }
});
</script>

<style scoped>
.container {
  padding: 10px;
  width: 500px;
  height: 100vh;
  border: 1px solid #d3d3d3;
  margin: 0 auto;
}
.container h3 {
  text-indent: 15px;
  line-height: 40px;
  color: #666;
  font-size: 16px;
  font-weight: lighter;
  background-color: #efeeee;
  margin-top: 6px;
}
.container button:hover {
  cursor: pointer;
  background-color: #cecccc;
}

.container button {
  width: 80px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  border: 1px solid #c2c0c0;
  border-radius: 10px;
  margin-top: 6px;
}
.icon-weizhi {
  color: #652e80 !important;
}
</style>
