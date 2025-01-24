<template>
  <div>
    <se-button @click="open">打开相册</se-button>
    &nbsp;
    <se-button @click="close">关闭相册</se-button>
  </div>
</template>

<script setup>
import { SeCreateAlbum } from "selab-ui";
const { open, close } = SeCreateAlbum({
  albumList: [
    "https://pic.imgdb.cn/item/65c1fec99f345e8d03a4d7b4.jpg",
    "https://pic.imgdb.cn/item/65c1ff5d9f345e8d03a66b58.jpg",
  ],
  modal: false,
  location: {
    x: window.innerWidth / 2 - 20,
    y: window.innerHeight / 2 - 20,
    width: 40,
    height: 40,
  },
});
</script>
