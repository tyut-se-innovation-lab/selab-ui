<template>
  <div style="display: inline-flex">
    <se-icon :icon="iconName1" color="gray"></se-icon>
    <se-icon :icon="iconName2" color="gray"></se-icon>
  </div>
</template>
<script lang="ts" setup>
const iconName1 = `mdi:content-copy`;
const iconName2 = `material-symbols:10k`;
</script>
