import { shallowReactive, createVNode, render, watch, ref, isVNode } from 'vue';
import type {
    MessageMsg,
    MessageHandler,
    MessageContext,
    MessageOption,
    MessagePropsType,
    MessageOptionNoType,
    Message
} from './message.d';
import { messageType, msgDefault } from './message.ts';
import SeMessage from './message.tsx';
import { getVNodeHeight, getSizeMap } from '@selab-ui/utils';

let seed = 1;

const instances: Array<MessageContext> = shallowReactive([]);

const msgZIndex = ref(msgDefault.zIndex);

watch(
    instances,
    (val, oVal) => {
        if (val.length === 0) {
            msgZIndex.value = msgDefault.zIndex;
            return;
        }
        // if (val.length < oVal.length) {
        //     // let deleteIndex = -1;
        //     oVal.forEach((instance: MessageContext, index: number) => {
        //         if (instance === val[index]) {
        //             // if (deleteIndex !== -1) deleteIndex = index;
        //             val[index].props.index--;
        //             // val[index].props.top -=
        //             //     getSizeMap(oVal[deleteIndex].props.size) * 60;
        //         }
        //         console.log(instance);
        //     });
        // }
        console.log(val, oVal, val === oVal);
    }
    // {
    //     deep: true
    // }
);

/** 将传入的数据转换成符合MessageOption的对象 */
function toMegOption(msg: MessageOption | MessageMsg): MessageOption {
    // 如果没有传入参数, 则报错
    if (!msg) {
        throw new Error('In the Message, the message or option is mandatory');
    }
    // 如果传入的不是 MessageOption 或 MessageMsg, 则报错
    if (
        typeof msg !== 'string' &&
        !isVNode(msg) &&
        typeof msg !== 'function' &&
        typeof msg === 'object' &&
        !('message' in msg)
    ) {
        throw new Error('In the Message, the message is mandatory');
    }
    // 如果传入的 message 是 string 或 VNode 或 function, 则返回一个 MessageOption
    if (typeof msg === 'string' || isVNode(msg) || typeof msg === 'function') {
        return {
            message: msg
        };
    } else {
        return msg;
    }
}

function getMsgHeight(
    msg: MessageMsg,
    size: 'default' | 'small' | 'large' | 'mini'
): number {
    if (typeof msg === 'string') {
        return getSizeMap(size) * 48 + 12;
    } else if (isVNode(msg)) {
        return getSizeMap(size) * (getVNodeHeight(msg) + 32) + 12;
    } else if (typeof msg === 'function') {
        return getSizeMap(size) * (getVNodeHeight(msg()) + 32) + 12;
    } else {
        return 0;
    }
}

function closeMessage(id: string) {
    const instance = instances.find((instance: MessageContext) => {
        return instance.id === id;
    });
    if (!instance) return;
    instances.splice(instance.props.index, 1);
    const topReduce = instance.props.height;
    for (let i = instance.props.index; i < instances.length; i++) {
        instances[i].props.index--;
        instances[i].props.top -= topReduce;
    }
    instance._handler._close();
}

function computedTop(props: Omit<MessagePropsType, 'zIndex'>) {
    if (instances[0]) {
        const _heightLast = instances[instances.length - 1].props.height;
        // const _heightNew = props.height;
        return instances[instances.length - 1].props.top + _heightLast;
    } else {
        return Math.pow(getSizeMap(props.size), 2) * 16;
    }
}

// 用于检查传入的option是否符合MessageOption的规范，如果不符合则使用默认值
function defaultOptions(
    option: MessageOption
): [Omit<MessagePropsType, 'zIndex'>, HTMLDivElement] {
    const _option: Omit<MessagePropsType, 'repeatNum' | 'zIndex'> = {} as Omit<
        MessagePropsType,
        'repeatNum' | 'zIndex'
    >;

    if (
        !(
            typeof option.message === 'string' ||
            isVNode(option.message) ||
            typeof option.message === 'function'
        )
    ) {
        console.warn('In the Message, the message is mandatory');
        _option.message = msgDefault.message;
    } else {
        _option.message = option.message;
    }

    if (typeof option.type !== 'string') {
        _option.type = msgDefault.type;
    } else if (!messageType.includes(option.type)) {
        console.warn(
            `In the Message, the type must be one of ${messageType}, but got ${option.type}`
        );
        _option.type = msgDefault.type;
    } else {
        _option.type = option.type;
    }

    if (typeof option.duration !== 'number') {
        _option.duration = msgDefault.duration;
    } else {
        _option.duration = option.duration;
    }

    if (typeof option.icon !== 'string') {
        _option.icon = option.type || msgDefault.icon;
    } else {
        _option.icon = option.icon;
    }

    if (typeof option.group !== 'boolean') {
        _option.group = msgDefault.group;
    } else {
        _option.group = option.group;
    }

    if (typeof option.size !== 'string') {
        _option.size = msgDefault.size;
    } else {
        _option.size = option.size;
    }

    let beforeClose: (close: () => void) => void;

    if (typeof option.beforeClose !== 'function') {
        beforeClose = msgDefault.beforeClose;
    } else {
        beforeClose = option.beforeClose;
    }

    if (typeof option.showClose !== 'boolean') {
        _option.showClose = msgDefault.showClose;
    } else {
        _option.showClose = option.showClose;
    }

    if (typeof option.onCloseClick !== 'function') {
        _option.onCloseClick = msgDefault.onCloseClick;
    } else {
        _option.onCloseClick = option.onCloseClick;
    }

    const container = document.createElement('div');

    return [
        {
            ..._option,
            repeatNum: msgDefault.repeatNum,
            height: getMsgHeight(_option.message, _option.size),
            onClose: (id: string) =>
                beforeClose(() => {
                    closeMessage(id);
                }),
            onDestroy: () => render(null, container)
        },
        container
    ];
}

const message: Message = function (
    option: MessageOption | MessageMsg
): MessageHandler {
    const _option = toMegOption(option);

    const [props, container] = defaultOptions(_option);

    // 判断 onCloseClick 和 beforeClose 是否存在时使用的是 _option 而不是 props.
    // 因为 props 中的 onCloseClick 和 beforeClose 已经被 defaultOptions 转换成了函数，是肯定存在的.
    if (
        props.group &&
        typeof props.message !== 'function' &&
        instances.length > 0 &&
        !_option.onCloseClick &&
        !_option.beforeClose
    ) {
        const instance = instances.find((instance) => {
            const messageSame = isVNode(props.message)
                ? props.message.key &&
                  instance.props.message.key === props.message.key
                : instance.props.message === props.message;
            return (
                messageSame &&
                instance.props.type === props.type &&
                instance.props.duration === props.duration &&
                instance.props.icon === props.icon &&
                instance.props.showClose === props.showClose
            );
        });
        if (instance) {
            instance.props.repeatNum++;
            container.remove();
            return instance.handler;
        }
    }

    const id = `__se_message__${seed++}__`;

    console.log(props.height);

    const top = computedTop(props);

    const vNode = createVNode(SeMessage, {
        ...props,
        repeatNum: 1,
        index: instances.length,
        zIndex: msgZIndex.value--,
        top,
        id
    });

    container.style.zIndex = '9999';

    render(vNode, container);

    document.body.appendChild(container.firstElementChild!);

    const vm = vNode.component!;

    const instance: MessageContext = {
        id,
        vNode,
        vm,
        handler: {
            close: () => {
                vm.exposed!.closeVisible();
            }
        },
        _handler: {
            _close: () => {
                vm.exposed!.visible.value = false;
            }
        },
        props: vNode.component!.props
    };

    instances.push(instance);

    return instance.handler;
};

// for (const key of messageType) {
//     message[key] = (option: MessageOptionNoType | MessageMsg) => {
//         return message({
//             ...toMegOption(option),
//             type: key
//         });
//     };
// }

message.success = (option: MessageOptionNoType | MessageMsg) =>
    message({
        ...toMegOption(option),
        type: 'success'
    });

message.warning = (option: MessageOptionNoType | MessageMsg) =>
    message({
        ...toMegOption(option),
        type: 'warning'
    });

message.danger = (option: MessageOptionNoType | MessageMsg) =>
    message({
        ...toMegOption(option),
        type: 'danger'
    });

message.info = (option: MessageOptionNoType | MessageMsg) =>
    message({
        ...toMegOption(option),
        type: 'info'
    });

message.closeAll = () => {
    instances.forEach((instance, index) => {
        setTimeout(() => {
            closeMessage(instance.id);
        }, index * 50);
    });
};

export default message;
