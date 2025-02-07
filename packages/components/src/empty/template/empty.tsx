// src/components/se-empty/se-empty.ts
import { defineComponent, computed, VNode } from 'vue';
import '../../less/components/empty/index.less'; // 引入样式文件

export default defineComponent({
  name: 'SeEmpty',
  props: {
    // 可接受的 `type` 属性，代表不同的空状态类型
    type: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }): () => VNode {
    // 计算当前 `type` 属性对应的样式类
    const emptyStyle = computed(() => {
      return props.type ? { [`se-empty--${props.type}`]: true } : {};
    });

    return () => (
        <div class={`se-empty ${emptyStyle.value ? Object.keys(emptyStyle.value).join(' ') : ''}`}>
          {slots.default && slots.default()} {/* 渲染插槽内容 */}
        </div>
    );
  }
});
