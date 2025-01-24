import { ExtractPropTypes, PropType } from "vue";

type ButtonType =
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "link";
type ButtonSize = "medium" | "small" | "large";
export const buttonProps = {
  // 类型
  type: {
    type: String as () => ButtonType,
    default: "info",
  },
  //默认点击事件
  onClick: {
    type: Function as PropType<() => void>,
  },
  // 朴素按钮
  plain: {
    type: Boolean,
    Boolean,
    default: false,
  },
  // 圆角按钮
  round: {
    type: Boolean,
    default: false,
  },
  // 禁用按钮
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
  size: {
    type: String as () => ButtonSize,
    default: "middle",
  },
};
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
