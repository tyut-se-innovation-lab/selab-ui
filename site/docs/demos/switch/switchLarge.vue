<template>
  <div>
    <se-switch v-model="value1"></se-switch>
    <se-switch v-model="value1" size="large"></se-switch>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value1 = ref(true);
</script>

<style scoped>
se-switch {
  margin-top: 20px;
}
</style>
