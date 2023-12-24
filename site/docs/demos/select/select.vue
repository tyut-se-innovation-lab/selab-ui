
<template>
  <div>
    <se-select :options="options"></se-select>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const options = ref(
    [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))
);
</script>

<style scoped>
</style>
