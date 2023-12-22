// 导入必要的模块和样式
import { defineComponent, computed, VNode } from 'vue';
import '../../less/components/box/index.less';

// 定义组件
export default defineComponent({
    // 设置组件名
    name: 'se-box',

    // 定义属性
    props: {
        type: String
    },

    // 定义模板
    setup(props, { slots }): () => VNode {
        // 为 buttonStyle 定义计算属性
        const buttonStyle = computed(() => {
            return props.type ? { ['se-box--' + props.type]: true } : {};
        });

        // 返回 JSX 模板
        return () => (
            <div
                class={`se-box ${
                    buttonStyle.value
                        ? Object.keys(buttonStyle.value).join(' ')
                        : ''
                }`}
            >
                {slots.default && slots.default()}
            </div>
        );
    }
});
