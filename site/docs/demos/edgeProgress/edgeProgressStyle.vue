<template>
  <div>
    <div
      v-edge-progress:[style]="value"
      class="edge-progress-box style"
      @click="styleChange"
    >
      点击此处改变进度条颜色、高度和位置
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref(50);
const style = {
  color: "#0066ff",
  strokeWidth: "3px",
  position: "top",
};

const styleChange = () => {
  style.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  style.strokeWidth = `${Math.floor(Math.random() * 10 + 1)}px`;
  style.position = Math.random() > 0.5 ? "top" : "bottom";
  value.value -= 0.1;
  setTimeout(() => {
    value.value += 0.1;
  });
};
</script>

<style scoped lang="less">
@import url("./box.less");
</style>
