import { ExtractPropTypes } from "vue";

export const radioProps = {
  size: {
    type: String,
    default: "",
  },
  options: {
    type: Array as () => (string | number | boolean | null)[],
    default: () => [],
  },
  name: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};
export type RadioProps = ExtractPropTypes<typeof radioProps>;
