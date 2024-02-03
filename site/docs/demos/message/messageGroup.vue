<template>
    <button @click="msg1">合并</button>
    <button @click="msg2">不合并</button>
</template>

<script setup lang="ts">
import { SeMsg } from 'selab-ui';
function msg1() {
    SeMsg({
        message: '分组合并'
    });
}
function msg2() {
    SeMsg({
        message: '分组不合并',
        group: false
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
