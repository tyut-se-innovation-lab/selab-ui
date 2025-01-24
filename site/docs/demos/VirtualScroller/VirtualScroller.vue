<template>
  <se-virtual-scroller
    :items="items"
    :itemHeight="40"
    :visibleCount="10"
    :onItemClick="handleItemClick"
    :containerHeight="300"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const items = ref(
  Array.from({ length: 1000 }, (_, index) => ({
    value: index,
    label: `选项 ${index + 1}`,
  })),
);

const handleItemClick = (item: { value: string | number; label: string }) => {
  console.log("点击了项:", item);
};
</script>
