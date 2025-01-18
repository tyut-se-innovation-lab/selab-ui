<template>
  <transition name="dialog-fade">
    <div class="se-dialog_wrapper" v-show="props.visible" @click="handleClose">
      <div class="se-dialog" :style="{ width: props.width, marginTop: props.top }">
        <div class="se-dialog_header">
          <slot name="title">
            <span class="se-dialog_title">{{ props.title }}</span>
          </slot>
          <span class="se-dialog_headerbtn" @click="handleClose" v-if="props.closeable">
            <slot name="closeIcon" v-if="slots.closeIcon"></slot>
            <template v-else>x</template>
          </span>
        </div>
        <div class="se-dialog_body">
          <slot>默认信息</slot>
        </div>
        <div class="se-dialog_footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { dialogProps, DialogProps } from './dialogTypes';
import { defineProps, useSlots } from 'vue';
import '../../less/components/dialog/index.less';
defineOptions({ name: 'SeDialog' });

// 使用类型断言解决冲突
const props = defineProps(dialogProps as Record<string, any>);
const emit = defineEmits(['close']);

// 点击关闭事件
const handleClose = () => {
  emit('close', false);
};

// 获取插槽的内容
const slots = useSlots();
</script>

