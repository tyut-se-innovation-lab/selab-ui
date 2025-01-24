<template>
  <div>
    <span
      ref="elRef"
      :class="[$attrs.class, 'se-icon']"
      :style="computedStyle"
    ></span>
  </div>
</template>

<script lang="ts" setup>
import { renderSVG } from "@iconify/iconify";
import {
  ref,
  computed,
  onMounted,
  unref,
  nextTick,
  CSSProperties,
  defineComponent,
} from "vue";
import "../../less/components/icon/index.less";
defineOptions({ name: "se-icon" });
// 定义组件的 Props
interface Props {
  icon: string; // 图标名称
  size?: number; // 图标大小（默认 16）
  color?: string; // 图标颜色（默认白色）
}

// 定义默认 Props
const props = withDefaults(defineProps<Props>(), {
  size: 16,
  color: "white",
});

// 引用 DOM 元素
const elRef = ref<Element>();

// 动态计算样式
const computedStyle = computed(
  (): CSSProperties => ({
    color: props.color,
    fontSize: `${props.size}px`,
    display: "inline-flex",
  }),
);

// 更新图标
const updateIcon = async () => {
  const el = unref(elRef);
  if (!el) return;
  await nextTick();

  const svg = renderSVG(props.icon);
  el.textContent = ""; // 清空内容
  if (svg) {
    // 如果有生成的 SVG，则直接追加
    el.appendChild(svg);
  } else {
    // 如果没有生成 SVG，创建一个备用的 span
    const span = document.createElement("span");
    span.className = "iconify";
    span.dataset.icon = props.icon;
    el.appendChild(span);
  }
};

// 组件挂载时执行
onMounted(() => {
  updateIcon();
});
</script>
