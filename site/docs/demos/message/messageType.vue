<template>
    <button @click="msg1('success')">成功</button>
    <button @click="msg1('warning')">警告</button>
    <button @click="msg1('danger')">错误</button>
    <button @click="msg1('info')">信息</button>
    <br /><br />
    <button @click="msg2('success')">成功</button>
    <button @click="msg2('warning')">警告</button>
    <button @click="msg2('danger')">错误</button>
    <button @click="msg2('info')">信息</button>
</template>

<script setup lang="ts">
import { SeMsg } from 'selab-ui';
function msg1(type: 'success' | 'warning' | 'danger' | 'info') {
    SeMsg({
        message: type,
        type
    });
}
function msg2(type: 'success' | 'warning' | 'danger' | 'info') {
    SeMsg[type](type);
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
