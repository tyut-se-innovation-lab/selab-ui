<template>
  <se-button @click="msg('success')">success</se-button>
  &nbsp;
  <se-button @click="msg('info')">info</se-button>
  &nbsp;
  <se-button @click="msg('warning')">warning</se-button>
  &nbsp;
  <se-button @click="msg('danger')">danger</se-button>
</template>

<script setup lang="ts">
import { SeMiniMsg } from "selab-ui";

const position = {
  success: {
    x: "20vw",
    y: "10vh",
  },
  info: {
    x: "80vw",
    y: "90vh",
  },
  warning: {
    x: "20vw",
    y: "90vh",
  },
  danger: {
    x: "80vw",
    y: "10vh",
  },
} as const;

function msg(type: "success" | "info" | "warning" | "danger") {
  SeMiniMsg({
    type: type,
    message: `This is a ${type} message`,
    duration: 3000,
    location: {
      x: position[type].x,
      y: position[type].y,
    },
  });
}
</script>
