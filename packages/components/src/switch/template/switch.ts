import { ExtractPropTypes } from "vue";
import { defineEmits } from "vue";

export const switchProps = {
  activeValue: {
    type: Boolean,
    default: true,
  },
  inactiveValue: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "default",
  },
  type: {
    type: String,
    default: "default",
  },
  inactiveText: {
    type: String,
    default: "",
  },
  activeText: {
    type: String,
    default: "",
  },
  switchDisabled: {
    type: Boolean,
    default: false,
  },
} as const;

export const switchEmits = {
  "update:modelValue": (value: boolean | string | number) => true,
  change: (value: boolean | string | number, ev: Event) => true,
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;
