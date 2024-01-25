import {
    defineComponent,
    computed,
    VNode,
    ref,
    Transition,
    Ref,
    ComputedRef,
    StyleValue
} from 'vue';
import '../../less/components/tooltip/index.less';
import { clickOutside } from '@selab-ui/utils';

export default defineComponent({
    name: 'se-tooltip',
    props: {
        type: String,
        color: {
            type: String,
            default: 'black'
        },
        mouseEnterDelay: {
            type: Number,
            default: 0.1 / 1000
        },
        mouseLeaveDelay: {
            type: Number,
            default: 0.1 / 1000
        },
        trigger: {
            type: String,
            default: 'hover'
        }
    },
    directives: {
        clickOutside
    },
    setup(props, { slots }): () => VNode {
        const tooltipStyle = computed(() => {
            return props.type ? { ['se-tooltip--' + props.type]: true } : {};
        });
        // 显示为true，隐藏为false
        const isTooltipVisible: Ref<boolean> = ref(false);
        // 获取传递的背景颜色
        const tooltipBgColorProps: string = props.color;
        // 触发方式
        const trigger: string = props.trigger;
        // // 背景颜色映射
        // const tooltipBgColorMap: Map<string, string> = new Map([
        //     ['black', '@bg-color-black'],
        //     ['pink', '@bg-color-pink'],
        //     ['red', '@bg-color-red'],
        //     ['yellow', '@bg-color-yellow'],
        //     ['orange', '@bg-color-orange'],
        //     ['cyan', '@bg-color-cyan'],
        //     ['green', '@bg-color-green'],
        //     ['blue', '@bg-color-blue'],
        //     ['purple', '@bg-color-purple'],
        //     ['geekblue', '@bg-color-geekblue'],
        //     ['magenta', '@bg-color-magenta'],
        //     ['volcano', '@bg-color-volcano'],
        //     ['gold', '@bg-color-gold'],
        //     ['lime', '@bg-color-lime']
        // ]);
        // 是否是16进制，是就返回true，不是就是false
        const isHex = (): boolean => {
            const regex: RegExp = /#/;
            return regex.test(tooltipBgColorProps);
        };
        // 16进制修改背景颜色（气泡）
        const hexBgColor = (): StyleValue | undefined => {
            if (isHex())
                return {
                    backgroundColor: tooltipBgColorProps
                };
            return undefined;
        };
        // 16进制修改边框颜色（箭头）
        const hexBdColor = (): StyleValue | undefined => {
            if (isHex()) {
                return {
                    content: '',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translate(-50%, -100%)',
                    width: 0,
                    height: 0,
                    border: '8px solid',
                    borderColor: `transparent transparent ${tooltipBgColorProps} transparent`
                };
            }
            return undefined;
        };
        // 获取移入显示延迟
        const mouseEnterDelay: number = props.mouseEnterDelay;
        // 获取移除隐藏延迟
        const mouseLeaveDelay: number = props.mouseLeaveDelay;

        // hover显示，isTooltipVisible为true
        const showTooltipHover = (): void => {
            trigger === 'hover' &&
                !isTooltipVisible.value &&
                setTimeout((): void => {
                    isTooltipVisible.value = true;
                }, mouseEnterDelay * 1000);
        };

        // hover隐藏，isTooltipVisible为false
        const hideTooltipHover = (): void => {
            trigger === 'hover' &&
                isTooltipVisible.value &&
                setTimeout((): void => {
                    isTooltipVisible.value = false;
                }, mouseLeaveDelay * 1000);
        };

        // focus显示，isTooltipVisible为true
        const showTooltipFocus = (): void => {
            trigger === 'focus' && (isTooltipVisible.value = true);
        };

        // focus隐藏，isTooltipVisible为false
        const hideTooltipFocus = (): void => {
            trigger === 'focus' && (isTooltipVisible.value = false);
        };

        // click显示，isTooltipVisible为true
        const changeTooltipClick = (): void => {
            trigger === 'click' &&
                (isTooltipVisible.value = !isTooltipVisible.value);
        };

        // click以外区域
        const changeTooltipClickOutside = (): void => {
            trigger === 'click' &&
                isTooltipVisible.value &&
                (isTooltipVisible.value = false);
        };

        // z-index
        const zIndexNum: ComputedRef<number> = computed((): number =>
            isTooltipVisible.value ? 100 : -1
        );

        return () => (
            <div
                class={`se-tooltip ${
                    tooltipStyle.value
                        ? Object.keys(tooltipStyle.value).join(' ')
                        : ''
                }`}
                onMouseenter={showTooltipHover}
                onMouseleave={hideTooltipHover}
                onFocus={showTooltipFocus}
                onBlur={hideTooltipFocus}
                onClick={changeTooltipClick}
                v-click-outside={changeTooltipClickOutside}
            >
                {/* 默认插槽 */}
                <div class="se-tooltip-text">
                    {slots.default && slots.default()}
                </div>

                {/* title插槽 */}
                <Transition
                    enterFromClass="fade-enter-from"
                    enterActiveClass="fade-enter-active"
                    leaveToClass="fade-leave-to"
                    leaveActiveClass="fade-leave-active"
                >
                    <div
                        class="se-tooltip-content"
                        v-show={isTooltipVisible.value}
                        style={{ zIndex: zIndexNum.value }}
                    >
                        {/* 小箭头 */}
                        <div class="se-tooltip-arrow">
                            <span
                                class={[
                                    'se-tooltip-arrow-content',
                                    isHex()
                                        ? ''
                                        : `se-tooltip-arrow-${tooltipBgColorProps}`
                                ]}
                                style={hexBdColor()}
                            ></span>
                        </div>
                        {/* 气泡 */}
                        <div
                            class={[
                                'se-tooltip-inner',
                                isHex()
                                    ? ''
                                    : `se-tooltip-inner-${tooltipBgColorProps}`
                            ]}
                            style={hexBgColor()}
                        >
                            {slots.title && slots.title()}
                        </div>
                    </div>
                </Transition>
            </div>
        );
    }
});
