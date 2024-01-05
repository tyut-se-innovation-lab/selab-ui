<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>

</template>
<script lang="ts">
import '../../../../utils/iconfont.js'
import '../../less/components/card/index.less'
import { defineComponent, computed } from 'vue'
import { iconProps } from './iconTypes.ts'
export default defineComponent({
  name: 'se-icon',
  props: iconProps,
  setup(props) {
    const iconName = computed(() => {
      return `#icon-${props.name}`
    })
    return {
      iconName
    };
  },
});
</script>
