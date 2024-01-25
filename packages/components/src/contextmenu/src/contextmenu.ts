import { PropType } from 'vue';
import { ContextmenuType, ContextmenuProps } from './contextmenu.d';

export const contextmenuProps: ContextmenuProps = {
    contextmenu: {
        type: Array as PropType<ContextmenuType>,
        default: []
    }
};
