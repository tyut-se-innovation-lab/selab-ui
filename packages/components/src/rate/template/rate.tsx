import { defineComponent, computed, VNode } from 'vue';
import '../../less/components/rate/index.less';
import SeRateStar from './components/rate-star';

export default defineComponent({
    name: 'se-rate',
    props: {
        type: String
    },
    setup(props): () => VNode {
        const rateStyle = computed(() => {
            return props.type ? { ['se-rate--' + props.type]: true } : {};
        });
        return () => (
            <ul
                class={`se-rate ${
                    rateStyle.value
                        ? Object.keys(rateStyle.value).join(' ')
                        : ''
                }`}
            >
                {new Array(5).fill(0).map(() => (
                    <SeRateStar />
                ))}
            </ul>
        );
    }
});
