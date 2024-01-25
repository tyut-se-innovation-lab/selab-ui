import { ContextmenuType } from './contextmenu.d';

export default {
    created() {
        console.log('method.ts, created');
    },
    mounted(el: HTMLElement, { value }: { value: ContextmenuType }) {
        console.log('method.ts', el, value);
    }
};
