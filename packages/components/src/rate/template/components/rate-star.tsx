import { defineComponent, VNode } from 'vue';
import '../../../less/components/rate/index.less';

export default defineComponent({
    name: 'se-rate-star',
    props: {
        type: String
    },
    setup(props): () => VNode {
        return () => (
            <li class={['se-rate-star']}>
                <div>
                    <div class="se-rate-star-first">
                        <span class={['action']}></span>
                    </div>
                    <div class="se-rate-star-second">
                        <span class={['action']}></span>
                    </div>
                </div>
            </li>
        );
    }
});
