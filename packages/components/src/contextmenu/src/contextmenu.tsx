import { defineComponent, VNode } from 'vue';
import '../../less/components/contextmenu/index.less';
import { contextmenuProps } from './contextmenu.ts';
export default defineComponent({
    name: 'se-contextmenu',
    props: contextmenuProps,
    setup(props): () => VNode {
        console.log('tsx', props);
        return () => <div class={`se-contextmenu`}></div>;
    }
});
