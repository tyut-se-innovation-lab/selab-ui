<template>
    <button @click="msg('success')">成功icon</button>
    <button @click="msg('warning')">警告icon</button>
    <button @click="msg('danger')">错误icon</button>
    <button @click="msg('info')">信息icon</button>
    <button @click="msg()">无icon</button>
</template>

<script setup lang="ts">
import { SeMsg } from 'selab-ui';
function msg(icon?: 'success' | 'warning' | 'danger' | 'info') {
    SeMsg({
        message: 'icon',
        icon
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
