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
import { getStringWidth, pupOpsMount } from '@selab-ui/utils';
import { UnitNumber } from '@selab-ui/utils/type';

const miniMsgComponent = defineComponent({
    name: 'se-img-previewMsg',
    props: {
        message: {
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
                }; width: ${getStringWidth(props.message)}px;`}
            >
                {props.message}
            </div>
        );
    }
});

// 保存当前的miniMsg的close方法
let nowMagClose: () => void;

// 限制x y的值为数字或数字加单位字符串
type locationType = number | UnitNumber;

/** 将location的位置规范化并添加单位 */
function locationFormat(
    location: { x: locationType; y: locationType },
    msg: string,
    // isViewport: boolean,
    root: HTMLElement | null
) {
    const { x, y } = location;
    const msgWidth = getStringWidth(msg);
    let rootWidth: number;
    let rootHeight: number;
    if (!root) {
        rootWidth = document.documentElement.clientWidth;
        rootHeight = document.documentElement.clientHeight;
    } else {
        rootWidth = (root?.parentNode as HTMLElement).clientWidth;
        rootHeight = (root?.parentNode as HTMLElement).clientHeight;
    }
    let xUnit: string;
    let yUnit: string;
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

export const seMiniMeg = function ({
    message,
    type = 'info',
    duration = 1000,
    location,
    root
}: {
    // 内容
    message: string;
    // 类型
    type?: 'info' | 'success' | 'danger' | 'warning';
    // 持续时间
    duration?: number;
    // 位置(相对于root)
    location: {
        x: locationType;
        y: locationType;
    };
    // 挂载点
    root?: HTMLElement;
}) {
    // 如果当前有miniMsg正在显示，则关闭当前的miniMsg
    if (nowMagClose) nowMagClose();
    const _location = locationFormat(location, message, root ? root : null);
    const div = document.createElement('div');
    div.className = 'se-msg-mini-root';

    if (!root) {
        const mountLocation = pupOpsMount();
        mountLocation.mountDiv(div);
    }
    const vNode = createVNode(miniMsgComponent, {
        message,
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
