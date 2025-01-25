<template>
  <!-- 竖直排列的锚点 -->
  <SeAnchor :items="anchorItems" type="vertical" @anchor-clicked="handleAnchorClick"  />
  <br/>
  <!-- 水平排列的锚点 -->
  <SeAnchor :items="anchorItems" type="horizontal" @anchor-clicked="handleAnchorClick"  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 定义锚点项
const anchorItems = ref([
  { text: "Section 1", link: "#section1", icon: 'material-symbols:home', targetId: "section1", active: true },
  { text: "Section 2", link: "#section2", icon: "material-symbols:settings-outline", targetId: "section2" },
  { text: "Section 3", link: "#section3", icon: "mdi:user", targetId: "section3" },
]);

// 监听锚点点击事件
const handleAnchorClick = (clickedItem: any) => {
  console.log("锚点项被点击:", clickedItem);

  // 遍历锚点项，切换活动状态
  anchorItems.value.forEach(item => {
    // 将点击的锚点项设为 active，其他项设为非活动状态
    item.active = item === clickedItem;
  });

  // 可以在此处执行其他操作，例如滚动页面、修改其他状态等
};
</script>
