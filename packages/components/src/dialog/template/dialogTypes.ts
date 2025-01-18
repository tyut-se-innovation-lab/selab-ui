import { ExtractPropTypes } from 'vue';

export const dialogProps = {
  title: {
    type: String,
    default: '提示',
  },
  width: {
    type: String,
    default: '30%',
  },
  top: {
    type: String,
    default: '15vh',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  closeable: {
    type: Boolean,
    default: true,
  },
};

export type DialogProps = ExtractPropTypes<typeof dialogProps>;
