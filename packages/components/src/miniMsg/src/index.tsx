import {
    defineComponent,
    onMounted,
    PropType,
    Ref,
    ref,
    createVNode,
    render
} from 'vue';
import '../../less/components/miniMsg/index.less';
import { getStringWidth, getPupOpsMountedLocation } from '@selab-ui/utils';

const miniMsgComponent = defineComponent({
    name: 'se-img-previewMsg',
    props: {
        msg: {
            type: String,
            default: '',
            required: true
        },
        type: {
            type: String as PropType<'info' | 'success' | 'danger' | 'warning'>,
            default: 'info'
        },
        duration: {
            type: Number,
            default: 1000
        },
        location: {
            type: Object as PropType<{ x: string; y: string }>,
            default: () => ({ x: '50%', y: '50%' })
        }
    },
    setup(props, { expose }) {
        const miniMsgRef = ref() as Ref<HTMLDivElement>;
        onMounted(() => {
            setTimeout(() => {
                miniMsgRef.value.style.opacity = '0';
                setTimeout(() => {
                    (miniMsgRef.value.parentNode as HTMLDivElement).remove();
                }, 300);
            }, props.duration);
        });
        expose({
            _close: () => {
                miniMsgRef.value.style.opacity = '0';
                setTimeout(() => {
                    (miniMsgRef.value.parentNode as HTMLDivElement).remove();
                }, 300);
            }
        });
        return () => (
            <div
                ref={miniMsgRef}
                class={`se-msg-mini se-msg-mini-${props.type}`}
                style={`left:${props.location.x};top:${
                    props.location.y
                }; width: ${getStringWidth(props.msg)}px;`}
            >
                {props.msg}
            </div>
        );
    }
});

let nowMagClose: () => void;

// 将location的位置规范化并添加单位
function locationFormat(
    location: { x: number | string; y: number | string },
    msg: string,
    isViewport: boolean,
    root: HTMLElement | null
) {
    const { x, y } = location;
    const msgWidth = getStringWidth(msg);
    let rootWidth: number;
    let rootHeight: number;
    if (isViewport) {
        rootWidth = document.documentElement.clientWidth;
        rootHeight = document.documentElement.clientHeight;
    } else {
        rootWidth = (root?.parentNode as HTMLElement).clientWidth;
        rootHeight = (root?.parentNode as HTMLElement).clientHeight;
    }
    let xUnit: string;
    let yUnit: string;
    console.log(x, y);
    if (typeof x === 'number') {
        if (msgWidth / 2 + 20 > x) {
            xUnit = msgWidth / 2 + 20 + 'px';
        } else if (msgWidth / 2 + 20 + x > rootWidth) {
            xUnit = rootWidth - msgWidth / 2 - 20 + 'px';
        } else {
            xUnit = x + 'px';
        }
    } else {
        if (x.match(/^[0-9]+$/)) {
            if (msgWidth / 2 + 20 > parseInt(x)) {
                xUnit = msgWidth / 2 + 20 + 'px';
            } else if (msgWidth / 2 + 20 + parseInt(x) > rootWidth) {
                xUnit = rootWidth - msgWidth / 2 - 20 + 'px';
            } else {
                xUnit = x + 'px';
            }
        } else {
            xUnit = x;
        }
    }
    if (typeof y === 'number') {
        if (18 > y) {
            yUnit = '18px';
        } else if (18 + y > rootHeight) {
            yUnit = rootHeight - 18 + 'px';
        } else {
            yUnit = y + 'px';
        }
    } else {
        if (y.match(/^[0-9]+$/)) {
            if (18 > parseInt(y)) {
                yUnit = '18px';
            } else if (18 + parseInt(y) > rootHeight) {
                yUnit = rootHeight - 18 + 'px';
            } else {
                yUnit = y + 'px';
            }
        } else {
            yUnit = y;
        }
    }
    return {
        x: xUnit,
        y: yUnit
    };
}

// const closePrev = function () {};

export const seMiniMeg = function ({
    msg,
    type = 'info',
    duration = 1000,
    location,
    root,
    isViewport = false
}: {
    // 内容
    msg: string;
    // 类型
    type?: 'info' | 'success' | 'danger' | 'warning';
    // 持续时间
    duration?: number;
    // 位置(相对于root)
    location: {
        x: number | string;
        y: number | string;
    };
    // 挂载点
    root?: HTMLElement;
    // 是否挂载到视口
    isViewport?: boolean;
}) {
    if (nowMagClose) nowMagClose();
    const _location = locationFormat(
        location,
        msg,
        isViewport,
        root ? root : null
    );
    const div = document.createElement('div');
    div.className = 'se-msg-mini-root';

    if (isViewport) {
        const mountLocation = getPupOpsMountedLocation();
        mountLocation.style.position = 'fixed';
        mountLocation.appendChild(div);
    } else {
        if (!root) throw new Error('root is required');
        root.appendChild(div);
    }
    const vNode = createVNode(miniMsgComponent, {
        msg,
        type,
        duration,
        location: _location
    });
    render(vNode, div);
    nowMagClose = () => {
        vNode.component!.exposed!._close();
    };
};

export default seMiniMeg;
