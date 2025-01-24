<template>
  <button @click="msg(true)">可关闭</button>
  <button @click="msg(false)">不可关闭</button>
</template>

<script setup lang="ts">
import { SeMsg } from "selab-ui";
function msg(showClose: boolean) {
  SeMsg({
    message: showClose ? "可关闭" : "不可关闭",
    showClose,
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
