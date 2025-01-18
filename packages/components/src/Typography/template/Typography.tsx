import {defineComponent, computed, VNode, PropType, CSSProperties} from "vue";
import "../../less/components/Typography/index.less";

export default defineComponent({
  name: "SeTypography",
  props: {
    // 文本类型，例如 h1~h6、p、span 等
    type: {
      type: String as PropType<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span">,
      default: "span", // 默认为 span 标签
    },
    // 是否加粗
    bold: {
      type: Boolean,
      default: false,
    },
    // 是否斜体
    italic: {
      type: Boolean,
      default: false,
    },
    // 是否添加下划线
    underline: {
      type: Boolean,
      default: false,
    },
    // 是否添加删除线
    strikethrough: {
      type: Boolean,
      default: false,
    },
    // 自定义字体颜色
    color: {
      type: String,
      default: "",
    },
    // 自定义字体大小
    size: {
      type: String,
      default: "",
    },
    // 文本对齐方式
    align: {
      type: String as PropType<"left" | "center" | "right" | "justify">,
      default: "left",
    },
    // 是否设置为不可选中
    unselectable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }): () => VNode {
    // 计算动态类名
    const typographyClass = computed(() => ({
      [`se-Typography--${props.type}`]: !!props.type, // 动态文本类型样式
      "se-Typography--bold": props.bold, // 加粗样式
      "se-Typography--italic": props.italic, // 斜体样式
      "se-Typography--underline": props.underline, // 下划线样式
      "se-Typography--strikethrough": props.strikethrough, // 删除线样式
      "se-Typography--unselectable": props.unselectable, // 不可选中样式
    }));

    // 计算内联样式
    const typographyStyle = computed(() => ({
      color: props.color || undefined,
      fontSize: props.size || undefined,
      textAlign: props.align as CSSProperties["textAlign"],
      userSelect: props.unselectable ? "none" : undefined,
    }) as CSSProperties);

    return () => {

      return (
          <div
              class={`se-Typography ${Object.keys(typographyClass.value)
                  .filter((key) => typographyClass.value[key])
                  .join(" ")}`}
              style={typographyStyle.value}
          >
            {slots.default && slots.default()} {/* 插槽内容 */}
          </div>
      );
    };
  },
});
