<template>
  <seBreadcrumb
      :items="breadcrumbItems"
      type="primary"
  >
<!--    <template #default>-->
<!--      <span>自定义内容可以通过插槽传入</span>-->
<!--    </template>-->
  </seBreadcrumb>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const breadcrumbItems = ref([
  { text: '首页', link: '/', icon: 'material-symbols:home' },   // 首页有图标
  { text: '产品' },
  { text: '详情', icon: 'dashicons:info' },  // 详情有图标
]);
</script>
