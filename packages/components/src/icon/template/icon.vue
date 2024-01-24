<template>
  <div style="width: 20px;color: #2ecc71">
    <svg class="icon" aria-hidden="true" style="width: 20px;height: 20px;">
      <use :xlink:href="iconName"></use>
    </svg>
  </div>
</template>
<script lang="ts">
import '../../../../utils/iconfont'
import '../../less/components/card/index.less'
import {defineComponent, computed} from 'vue'
import {iconProps} from './iconTypes.ts'

export default defineComponent({
  name: 'se-icon',
  props: iconProps,
  setup(props) {
    const iconName = computed(() => {
      return `#icon-${props.name}`
    })
    const iconColor = computed(() => {
      return props.color ? props.color : '#333'
    })
    return {
      iconName,
      iconColor
    };
  },
});
</script>
