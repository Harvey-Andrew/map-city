<template>
  <div>
    <div class="tip" v-if="isShow">
      <div>定位到您在'玉林'</div>
      <div>
        <button @click="$emit('toggle', '玉林')">切换至玉林</button
        ><span @click="$emit('close')">x</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isShow: {
    type: Boolean,
  },
});
const $emit = defineEmits(["close", "toggle"]);
</script>

<style lang="scss" scoped>
.tip {
  position: fixed;
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  z-index: 1000;
  background-color: #333333d2;
  left: 50%;
  bottom: 30px;
  transform: translate(-50%);
  border-radius: 10px;
  color: #fff;
  button {
    width: 80px;
    height: 35px;
  }
  span {
    cursor: pointer;
  }
}
</style>
