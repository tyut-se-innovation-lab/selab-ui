<template>
  <!-- 使用默认图标 (星星)，选中后的颜色为绿色 -->
  <se-rate
    v-model="rating"
    :max="5"
    hoverColor="#ffcc00"
    color="#808080"
    :selectedColor="'green'"
  />

  <!-- 使用自定义图标 (心形)，选中后的颜色为红色 -->
  <se-rate
    v-model="rating"
    :icon="'mdi:heart'"
    :max="10"
    hoverColor="#ff0000"
    color="#808080"
    :selectedColor="'red'"
  />
</template>

<script setup>
import { ref } from "vue";

const rating = ref(3); // 初始评分
</script>
