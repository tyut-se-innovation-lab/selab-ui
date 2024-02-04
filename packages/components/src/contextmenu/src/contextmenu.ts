import { PropType } from 'vue';
import {
    ContextmenuType,
    ContextmenuProps,
    ContextmenuItemType
} from './contextmenu.d';

export const contextmenuDefault: ContextmenuItemType = {
    name: '',
    icon: '',
    onClick: () => {},
    disabled: false,
    hidden: false,
    children: null,
    underDivider: false
};

export const contextmenuProps: ContextmenuProps = {
    contextmenu: {
        type: Array as PropType<ContextmenuType>,
        default: [
            {
                ...contextmenuDefault
            }
        ]
    }
};
