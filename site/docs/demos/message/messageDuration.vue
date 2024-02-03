<template>
    <button @click="msg(1000, '1s')">1s</button>
    <button @click="msg(2000, '2s')">2s</button>
    <button @click="msg(3000, '3s')">3s</button>
    <button @click="msg(0, '停留')">停留</button>
</template>

<script setup lang="ts">
import { SeMsg } from 'selab-ui';
function msg(duration: number, msg: string) {
    SeMsg({
        message: msg,
        duration,
        showClose: true
    });
}
</script>

<style lang="less" scoped>
button {
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
