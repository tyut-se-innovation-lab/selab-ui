
<template>
  <div>
    <se-switch v-model="value"></se-switch>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const value = ref(true)
</script>

<style scoped>
</style>
