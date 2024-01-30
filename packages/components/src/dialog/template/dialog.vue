<template>
  <!--   遮罩 -->
  <transition name="dialog-fade">
    <div class="se-dialog_wrapper" v-show="props.visible" @click.self="handlClose">
      <div class="se-dialog" :style="{ width: props.width, marginTop: props.top }">
        <div class="se-dialog_header">
          <slot name="title">
            <span class="se-dialog_title">{{ props.title }}</span>
          </slot>

          <span class="se-dialog_headerbtn" @click="handlClose" v-if="props.closeable">
            <template v-if="slots.closeIcon">
                <slot name="closeIcon"></slot>
            </template>
            <template v-else> x </template>
          </span>
        </div>
        <div class="se-dialog_body">
          <!--   给一个默认插槽，传入任意内容  -->
          <slot>
            默认信息
          </slot>
        </div>
        <div class="se-dialog_footer" v-if="$slots.footer">
          <slot name="footer">
            
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import '../../less/components/dialog/index.less';
import { defineProps,useSlots } from 'vue';
import { DialogProps, dialogProps } from './dialogTypes'
defineOptions({ name: "se-dialog" });
//定义组件的props
const props: DialogProps = defineProps(dialogProps)
const emit = defineEmits(['close',])
//点击关闭事件
const handlClose = () => {
  emit('close', false)
}
//获取插槽的内容
const slots = useSlots()

</script>
