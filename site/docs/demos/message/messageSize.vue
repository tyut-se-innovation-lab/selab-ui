<template>
    <button @click="msg('mini')">小小</button>
    <button @click="msg('small')">小</button>
    <button @click="msg('default')">默认</button>
    <button @click="msg('large')">大</button>
</template>

<script setup lang="ts">
import { seMsg } from 'selab-ui';
function msg(size: 'mini' | 'small' | 'default' | 'large') {
    seMsg({
        message: size,
        size: size
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
