import { defineComponent, VNode } from 'vue';
import '../../less/components/contextmenu/index.less';
import { contextmenuProps } from './contextmenu';
export default defineComponent({
    name: 'se-contextmenu',
    props: contextmenuProps,
    setup(props): () => VNode {
        console.log('tsx', props);
        return () => {
            return <div class={`se-contextmenu`}></div>;
        };
    }
});
