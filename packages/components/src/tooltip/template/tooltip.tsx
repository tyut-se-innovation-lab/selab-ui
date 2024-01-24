import {
    defineComponent,
    computed,
    VNode,
    ref,
    Transition,
    Ref,
    ComputedRef
} from 'vue';
import '../../less/components/tooltip/index.less';

export default defineComponent({
    name: 'se-tooltip',
    props: {
        type: String,
        color: {
            type: String,
            default: 'blue'
        },
        mouseEnterDelay: {
            type: Number,
            default: 0.1
        },
        mouseLeaveDelay: {
            type: Number,
            default: 0.1
        }
    },
    setup(props, { slots }): () => VNode {
        const tooltipStyle = computed(() => {
            return props.type ? { ['se-tooltip--' + props.type]: true } : {};
        });
        // 显示为true，隐藏为false
        const isTooltipVisible: Ref<boolean> = ref(false);
        // 获取传递的背景颜色
        const tooltipBgColorProps: string = props.color;
        // 背景颜色映射
        const tooltipBgColorMap: Map<string, string> = new Map([
            ['blue', '#3498db'],
            ['pink', '#eb2f96']
        ]);
        // 是否是16进制，是就返回true，不是就是false
        const isHex = (): boolean => {
            const regex: RegExp = /#/;
            return regex.test(tooltipBgColorProps);
        };
        // 最终的背景颜色
        const tooltipBgColor: ComputedRef<string> = computed((): string =>
            isHex()
                ? tooltipBgColorProps
                : tooltipBgColorMap.get(tooltipBgColorProps)!
        );
        // 获取移入显示延迟
        const mouseEnterDelay: number = props.mouseEnterDelay;
        // 获取移除隐藏延迟
        const mouseLeaveDelay: number = props.mouseLeaveDelay;

        // 显示，isTooltipVisible为true
        const showTooltip = (): void => {
            setTimeout(() => {
                isTooltipVisible.value = true;
            }, mouseEnterDelay);
        };

        // 隐藏，isTooltipVisible为false
        const hideTooltip = () => {
            setTimeout(() => {
                isTooltipVisible.value = false;
            }, mouseLeaveDelay);
        };

        // z-index
        const zIndexNum: ComputedRef<number> = computed(() =>
            isTooltipVisible.value ? 100 : -1
        );

        return () => (
            <div
                class={`se-tooltip ${
                    tooltipStyle.value
                        ? Object.keys(tooltipStyle.value).join(' ')
                        : ''
                }`}
            >
                {/* 默认插槽 */}
                <div
                    class="se-tooltip-text"
                    onMouseenter={showTooltip}
                    onMouseleave={hideTooltip}
                >
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
                        onMouseenter={showTooltip}
                        onMouseleave={hideTooltip}
                        style={{ zIndex: zIndexNum.value }}
                    >
                        <div class="se-tooltip-arrow">
                            <span
                                class="se-tooltip-arrow-content"
                                style={{
                                    '--before-border-color': `transparent transparent ${tooltipBgColor.value} transparent`
                                }}
                            ></span>
                        </div>
                        <div
                            class="se-tooltip-inner"
                            style={{ '--bgColor': tooltipBgColor.value }}
                        >
                            {slots.title && slots.title()}
                        </div>
                    </div>
                </Transition>
            </div>
        );
    }
});
