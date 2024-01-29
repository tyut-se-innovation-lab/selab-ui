<template>
  <!--   遮罩 -->
  <transition name="dialog-fade">
    <div class="se-dialog_wrapper" v-show="visible" @click.self="handlClose">
      <div class="se-dialog" :style="{ width: width, marginTop: top }">
        <div class="se-dialog_header"> 
          <slot name="title">
            <span class="se-dialog_title">{{ title }}</span>
          </slot>

          <button class="se-dialog_headerbtn" @click="handlClose">
            <i class="se-cion-close">x</i>
          </button>
        </div> 
        <div class="se-dialog_body"> 
          给一个默认插槽，传入任意内容 
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

defineOptions({ name: "se-dialog" });
//定义组件props
type dialogProps = {
  title: {
    type: string,
    default: "提示",
  },
  width: {
    type: string,
    default: "60%",
  },
  top: {
    type: string,
    default: "15vh",
  },
  visible: {
    type: Boolean,
    default: true,
  }
};
const dialogProps = defineProps<dialogProps>();

const emit = defineEmits(['close',])
//点击关闭事件
const handlClose = () => {
  emit('close', false)
}

</script>
