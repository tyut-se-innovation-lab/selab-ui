import { defineComponent, computed, VNode } from "vue";
import "../../less/components/flex/index.less";

export default defineComponent({
  name: "SeFlex",
  props: {
    /** 布局方向 */
    direction: {
      type: String,
      default: "row", // row | column
    },
    /** 主轴对齐方式 */
    justify: {
      type: String,
      default: "start", // start | center | end | space-between | space-around | space-evenly
    },
    /** 交叉轴对齐方式 */
    align: {
      type: String,
      default: "stretch", // stretch | start | center | end
    },
    /** 是否自动换行 */
    wrap: {
      type: Boolean,
      default: false,
    },
    /** 子元素间距 */
    gap: {
      type: [String, Number],
      default: 0,
    },
  },
  setup(props, { slots }) {
    // 动态生成样式
    const flexClasses = computed(() => ({
      [`se-flex--direction-${props.direction}`]: true,
      [`se-flex--justify-${props.justify}`]: true,
      [`se-flex--align-${props.align}`]: true,
      [`se-flex--wrap`]: props.wrap,
    }));

    const flexStyle = computed(() => ({
      gap: typeof props.gap === "number" ? `${props.gap}px` : props.gap,
    }));

    return () => (
        <div class={`se-flex ${Object.keys(flexClasses.value).join(" ")}`} style={flexStyle.value}>
          {slots.default?.()}
        </div>
    );
  },
});
