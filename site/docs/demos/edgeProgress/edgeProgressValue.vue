<template>
    <div>
        <div
            v-edge-progress="value"
            class="edge-progress-box value"
            @wheel="valueChange"
        >
            在此处滚动鼠标滚轮调整进度
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0);
const valueChange = (e: WheelEvent) => {
    e.preventDefault();
    if (value.value < 0) {
        value.value = 0;
    } else if (value.value > 100) {
        value.value = 100;
    }
    value.value -= e.deltaY / 10;
};
</script>

<style scoped lang="less">
@import url('./box.less');
</style>
