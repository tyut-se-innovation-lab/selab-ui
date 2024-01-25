
<template>
  <span v-for="(item,index) in IconArray()" style="display: inline-block;width: 100%">
  <span>{{ index + 1}}</span> <se-icon style="display: inline-block;" :name="item" :color="getRandomColor()" ></se-icon> <span>{{item}}</span>
  </span>

</template>

<script>

import {IconArray} from "./output";
import {defineComponent} from "vue";
import {getRandomColor} from "../utils/getRandomColor";


export default defineComponent({
  methods: {
    getRandomColor,
    IconArray() {
      return IconArray
    }
  }
})

</script>

<style scoped>
span{
  margin: 20px;
}
</style>
