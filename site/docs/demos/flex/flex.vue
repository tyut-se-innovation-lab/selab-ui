<template>
  <se-flex
    direction="row"
    justify="center"
    align="center"
    :gap="20"
    :wrap="true"
  >
    <se-box type="primary" v-for="item in 5" :key="item">Box {{ item }}</se-box>
  </se-flex>
</template>
