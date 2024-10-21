<template>
    <div>
        <button ref="button1" @click="success">test</button>
    </div>
</template>

<script setup lang="ts">
import { SeMiniMsg } from 'selab-ui';
import { ref } from 'vue';
const button1 = ref<HTMLElement>();
function success() {
    SeMiniMsg({
        type: 'success',
        message: 'This is a success message',
        duration: 3000,
        location: {
            x: 0,
            y: 0
        },
        root: button1.value as HTMLElement
    });
}
</script>

<style scoped>
button {
    position: relative;
    margin-right: 10px;
    width: 60px;
    height: 30px;
    background-color: #6c9dff;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: #6c89ff;
    }
}
</style>
