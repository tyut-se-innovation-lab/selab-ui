import { defineComponent, computed } from 'vue';
import '../../less/components/Divider/index.less';

export default defineComponent({
    name: 'SeDivider',
    props: {
        /**
         * 分隔线方向：horizontal 或 vertical
         */
        type: {
            type: String,
            default: 'horizontal',
            validator: (value: string) => ['horizontal', 'vertical'].includes(value),
        },
        /**
         * 是否为虚线样式
         */
        dashed: {
            type: Boolean,
            default: false,
        },
        /**
         * 内容对齐方式：left, center, right
         */
        orientation: {
            type: String,
            default: 'center',
            validator: (value: string) => ['left', 'center', 'right'].includes(value),
        },
        /**
         * 分隔线内容，优先级低于插槽
         */
        content: {
            type: String,
            default: '',
        },
    },
    setup(props, { slots }) {
        /**
         * 计算分隔线的整体类名
         */
        const dividerClass = computed(() => {
            return [
                'se-Divider',
                `se-Divider--${props.type}`,
                props.dashed && 'se-Divider--dashed',
            ]
                .filter(Boolean)
                .join(' ');
        });

        /**
         * 计算内容的类名
         */
        const contentClass = computed(() => `se-Divider-content--${props.orientation}`);

        /**
         * 渲染 JSX
         */
        return () => (
            <div class={dividerClass.value}>
                {props.type === 'horizontal' &&
                    (props.content || slots.default) && (
                        <span class={`se-Divider-content ${contentClass.value}`}>
                            {slots.default?.() || props.content}
                        </span>
                    )}
            </div>
        );
    },
});
