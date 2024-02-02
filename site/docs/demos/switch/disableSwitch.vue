<template>
<se-switch v-model="value" inactiveText="正常状态"></se-switch>
<se-switch v-model="value1" inactiveText="禁用状态" switchDisabled ></se-switch>
</template>
<script setup lang="ts">
import {ref} from "vue";
const value = ref(true)
const value1 = ref(true)

</script>


<style scoped>

</style>