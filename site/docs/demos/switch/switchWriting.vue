<template>
  <se-switch v-model="value" inactiveText="左边文字" activeText="右面文字"></se-switch>
</template>
<script setup lang="ts">
import {ref} from "vue";
const value = ref(true)
</script>
<style scoped>

</style>