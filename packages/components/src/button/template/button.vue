<template>
  <button class="se-button" :class="buttonStyle" @click="handleClick">
    <!-- 使用默认插槽的文本 -->
    <slot>Default Text</slot>
  </button>
</template>

<script lang="ts" setup>
import '../../less/components/button/index.less';
import { defineProps, computed, ref, reactive } from 'vue';
defineOptions({ name: "se-button" });
// 定义组件 props
const props = defineProps<{
  type?: string;
  onClick?: () => void; // 添加 onClick prop
}>();

// 计算属性，根据 type 属性计算按钮样式
const buttonStyle = computed(() => {
  return {
    [`se-button--${props.type || 'default'}`]: true
  };
});

// 默认点击事件处理程序
const defaultClickHandler = 'Default Click Handler';

// 暴露给测试的方法，用于验证点击事件是否触发
const clickHandler = reactive({ value: defaultClickHandler });

// 处理点击事件
const handleClick = () => {
  // 如果未提供点击事件处理程序，使用默认的点击事件处理程序
  if (!props.onClick) {
    clickHandler.value =  defaultClickHandler ;
  } else {
    // 如果提供了点击事件处理程序，执行用户提供的处理程序
    props.onClick();
    // 更新 clickHandler 的值
    clickHandler.value = 'Default Click Handler' ;
  }
};
</script>

<style scoped></style>
