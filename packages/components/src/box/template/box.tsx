import { defineComponent, computed, h } from 'vue';
import '../../less/components/box/index.less';

export default defineComponent({
    name: 'se-box',

    props: {
        type: {
            type: [String, Array], // 支持单个类型或多个类型的组合
            default: ''
        },
        tag: {
            type: String,
            default: 'div' // 动态选择渲染的 HTML 标签
        },
        customClass: {
            type: [String, Array], // 支持用户传入额外的自定义类名
            default: ''
        }
    },

    setup(props, { slots, attrs }) {
        // 动态计算类名
        const classes = computed(() => {
            const baseClass = 'se-box';
            const typeClasses = Array.isArray(props.type)
                ? props.type.map((type) => `se-box--${type}`)
                : props.type
                    ? [`se-box--${props.type}`]
                    : [];
            const customClasses = Array.isArray(props.customClass)
                ? props.customClass
                : props.customClass
                    ? [props.customClass]
                    : [];
            return [baseClass, ...typeClasses, ...customClasses].join(' ');
        });

        return () =>
            h(
                props.tag,
                {
                    class: classes.value,
                    ...attrs // 传递额外属性，例如 style, id 等
                },
                slots.default ? slots.default() : 'Default content' // 渲染插槽或默认内容
            );
    }
});
