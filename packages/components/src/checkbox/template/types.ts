import { ExtractPropTypes } from "vue";
import { PropType } from "vue";

export const checkboxProps = {
  modelValue: {
    type: Array as PropType<Array<string | number>>,
    default: () => [],
  },
  options: {
    type: Array as PropType<Array<string | number>>,
    required: true,
  },
  size: {
    type: String as PropType<"small" | "middle" | "large">,
    default: "middle",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  checkAllText: {
    type: String,
    default: "全选",
  },
  checkClearText: {
    type: String,
    default: "清除",
  },
};
export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;
