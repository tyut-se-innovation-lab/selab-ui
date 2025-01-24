import { defineComponent, computed, VNode, PropType } from "vue";
import "../../less/components/grid/index.less";

export default defineComponent({
  name: "se-grid",
  props: {
    // 列数（控制显示几列）
    columns: {
      type: Number,
      default: 3, // 默认 3 列
    },
    // 行数（如果需要固定行数）
    rows: {
      type: Number,
      default: 0, // 默认行数不限制
    },
    // 间距（控制子元素之间的间距）
    gap: {
      type: Number,
      default: 10, // 默认间距 10px
    },
    // 布局类型（支持 flex 或 grid 布局）
    type: {
      type: String as PropType<"flex" | "grid">,
      default: "grid",
    },
  },
  setup(props, { slots }): () => VNode {
    // 根据传入的 props 动态计算网格布局的样式
    const gridStyle = computed(() => {
      const style: Record<string, any> = {};

      if (props.type === "grid") {
        style.display = "grid";
        style.gridTemplateColumns = `repeat(${props.columns}, 1fr)`;
        style.gap = `${props.gap}px`;
      } else if (props.type === "flex") {
        style.display = "flex";
        style.flexWrap = "wrap";
        style.gap = `${props.gap}px`;
      }

      return style;
    });

    return () => (
      <div class="se-grid" style={gridStyle.value}>
        {slots.default && slots.default()}
      </div>
    );
  },
});
