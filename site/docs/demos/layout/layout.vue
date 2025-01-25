<template>
  <SeLayout v-model:collapsed="collapsed">
    <template #header>
      <div>顶部导航栏内容</div>
    </template>
    <template #sider>
      <div>侧边栏内容</div>
    </template>
    <template #content>
      <div>主体内容区域</div>
    </template>
    <template #footer>
      <div>底部区域</div>
    </template>
  </SeLayout>
</template>

<script setup>
import { ref } from 'vue';


const collapsed = ref(false); // 控制侧边栏收缩状态
</script>
