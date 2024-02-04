import type {
    MessageContext,
    MessageProps,
    MessagePropsType
} from './message.d';
import { VNode, PropType } from 'vue';
import { getStyle } from '@selab-ui/utils';

const messageType = getStyle();

const iconType = [...messageType];

export const iconMap = {
    info: 'info',
    success: 'roundcheck',
    // hear
    warning: 'round_warn',
    danger: 'roundclose'
};

const msgDefault: MessagePropsType = {
    id: '',
    message: '',
    type: 'info',
    duration: 3000,
    icon: 'info',
    showClose: false,
    group: true,
    size: 'default',
    repeatNum: 0,
    zIndex: 2000000000,
    index: 0,
    top: 0,
    height: 0,
    beforeClose: (close: () => void): void => close(),
    onCloseClick: () => void 0,
    onClose: () => void 0,
    onDestroy: () => void 0
};

const msgProps: MessageProps = {
    id: {
        type: String,
        default: msgDefault.id
    },
    message: {
        type: [String, Object, Function] as PropType<
            string | VNode | (() => VNode)
        >,
        default: msgDefault.message
    },
    type: {
        type: String as PropType<(typeof messageType)[number]>,
        default: msgDefault.type
    },
    duration: {
        type: Number,
        default: msgDefault.duration
    },
    icon: {
        type: String as PropType<(typeof iconType)[number]>,
        default: msgDefault.icon
    },
    showClose: {
        type: Boolean,
        default: msgDefault.showClose
    },
    group: {
        type: Boolean,
        default: msgDefault.group
    },
    size: {
        type: String as PropType<'default' | 'small' | 'large' | 'mini'>,
        default: msgDefault.size
    },
    repeatNum: {
        type: Number,
        default: msgDefault.repeatNum
    },
    zIndex: {
        type: Number,
        default: msgDefault.zIndex
    },
    index: {
        type: Number,
        default: msgDefault.index
    },
    top: {
        type: Number,
        default: msgDefault.top
    },
    height: {
        type: Number,
        default: msgDefault.height
    },
    beforeClose: {
        type: Function as PropType<(close: () => void) => void>,
        default: msgDefault.beforeClose
    },
    onCloseClick: {
        type: Function as PropType<(instance: MessageContext) => void>,
        default: msgDefault.onCloseClick
    },
    onClose: {
        type: Function as PropType<() => void>,
        default: msgDefault.onClose
    },
    onDestroy: {
        type: Function as PropType<() => void>,
        default: msgDefault.onDestroy
    }
};

export { messageType, iconType, msgDefault, msgProps };
