<template>
    <span
        class="se-tag"
        :class="tagClasses"
        v-if="visible"
        @click="handleClick"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <slot />
        <span
            class="se-tag__close-icon"
            v-if="closeable"
            @click.stop="handleClose"
        >
            <slot name="closeIcon">×</slot>
        </span>
    </span>
</template>

<script lang="ts" setup>
import { computed, ref, withDefaults, watch } from 'vue';
import '../../less/components/tag/index.less'
defineOptions({ name: 'se-tag' });
// Tag 类型
type TagType = 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'default';
// Tag 形状
type TagShape = 'round' | 'square';
// Tag 大小
type TagSize = 'small' | 'medium' | 'large';

const props = withDefaults(defineProps<{
  type?: TagType;
  closeable?: boolean;
  show?: boolean; // 控制标签是否显示
  shape?: TagShape; // 控制标签形状（圆形或方形）
  size?: TagSize; // 控制标签大小
}>(), {
  type: 'info',
  closeable: true,
  show: true,
  shape: 'round',
  size: 'medium',
});

const emits = defineEmits(['close', 'click', 'mouseenter', 'mouseleave']);

// 控制标签的显示与隐藏
const visible = ref(props.show);

watch(() => props.show, (newValue) => {
  visible.value = newValue;
});

// 处理点击事件
const handleClick = () => emits('click');

// 处理关闭事件
const handleClose = () => {
  visible.value = false;
  emits('close');
};

// 鼠标悬停事件
const handleMouseEnter = () => emits('mouseenter');

// 鼠标离开事件
const handleMouseLeave = () => emits('mouseleave');

// 计算标签的样式类
const tagClasses = computed(() => [
  'se-tag',
  props.type ? `se-tag--${props.type}` : '',
  props.shape ? `se-tag--${props.shape}` : 'se-tag--round', // 默认圆角
  props.size ? `se-tag--${props.size}` : 'se-tag--medium', // 默认中等大小
]);

</script>
