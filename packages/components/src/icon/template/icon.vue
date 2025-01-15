<template>
  <span class="iconfont"
        :class="iconName"
        :style="{ fontSize: iconSize, color: iconColor,}"
  ></span>
</template>

<script lang="ts">

import '../../less/components/icon/index.less'
import { defineComponent, computed } from 'vue'
import { iconProps } from './iconTypes.ts'


export default defineComponent({
  name: 'se-icon',
  props: {
    ...iconProps,
  },
  setup(props) {
    const iconName = computed(() => `icon-${props.name}`)
    const iconColor = computed(() => props.color || '#333')

    return {
      iconName,
      iconColor
    }
  },
})
</script>

<style scoped>

</style>
