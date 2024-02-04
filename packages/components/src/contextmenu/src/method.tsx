import { contextmenuDefault } from './contextmenu';
import {
    PartialContextmenuItemType,
    ContextmenuItemType,
    PartialContextmenuType,
    ContextmenuType
} from './contextmenu.d';
/** 子配置检查和空属性赋默认值 */
function itemCheck(option: PartialContextmenuItemType): ContextmenuItemType {
    if (
        !(typeof option.name === 'string') ||
        !(typeof option.onClick === 'function')
    ) {
        throw console.error(
            'Contextmenu > customize contextmenu item must have name and onClick'
        );
    }

    if (option.children && !Array.isArray(option.children)) {
        throw console.error(
            'Contextmenu > customize contextmenu item children must be array'
        );
    } else if (option.children) {
        const children = check(option.children);

        return {
            ...contextmenuDefault,
            ...option,
            children
        };
    } else {
        return {
            ...contextmenuDefault,
            ...option,
            children: null
        };
    }
}

/** 配置检查和空属性赋默认值 */
export function check<
    T extends boolean | PartialContextmenuType,
    K extends T extends PartialContextmenuType ? ContextmenuType : boolean
>(option: T): K {
    if (typeof option === 'boolean') {
        const _option = option as boolean;
        return _option as K;
    }

    if (!Array.isArray(option)) {
        throw console.error('Contextmenu > items must be array');
    }

    const _option = option.map((item) => itemCheck(item)) as ContextmenuType;

    return _option as K;
}
