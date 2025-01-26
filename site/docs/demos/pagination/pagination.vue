<template>
  <se-pagination
      :total="100"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @update:currentPage="updatePage"
      @update:pageSize="updatePageSize"
  />
</template>

<script setup>
import { ref } from 'vue';

const currentPage = ref(1);
const pageSize = ref(10);

const updatePage = (page) => {
  currentPage.value = page;
};

const updatePageSize = (size) => {
  pageSize.value = size;
};
</script>
