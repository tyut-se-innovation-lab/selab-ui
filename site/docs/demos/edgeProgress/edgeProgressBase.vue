<template>
    <div>
        <div v-edge-progress="value" class="edge-progress-box base">
            进度条盒子
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(15);
</script>

<style scoped lang="less">
@import url('./box.less');
</style>
