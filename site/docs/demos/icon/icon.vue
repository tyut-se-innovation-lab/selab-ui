
<template>
  <se-icon name="mobile_fill"></se-icon>
  <span v-for="(item,index) in IconArray()" style="display: inline-block;width: 100%">
  <span>{{index}}</span> <se-icon style="display: inline-block" :name="item" ></se-icon> <span>{{item}}</span>
  </span>

</template>

<script>

import {IconArray} from "./output";
import {defineComponent} from "vue";

export default defineComponent({
  methods: {
    IconArray() {
      return IconArray
    }
  }
})

</script>

<style scoped>
span{
  padding: 20px;
}
</style>
