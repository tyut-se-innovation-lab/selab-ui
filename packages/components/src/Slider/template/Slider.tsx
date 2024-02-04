import { defineComponent, computed, VNode } from 'vue';
import '../../less/components/Slider/index.less';
export default defineComponent({
    name: 'se-Slider',
    props: {
        type: String
    },
    setup(props, { slots }): () => VNode {
        const SliderStyle = computed(() => {
            return props.type ? { ['se-Slider--' + props.type]: true } : {};
        });
        return () => (
            <div
                class={`se-Slider ${
                    SliderStyle.value
                        ? Object.keys(SliderStyle.value).join(' ')
                        : ''
                }`}
            >
                {slots.default && slots.default()}
            </div>
        );
    }
});
