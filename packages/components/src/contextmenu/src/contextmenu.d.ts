import { CreateProps } from '@selab-ui/utils/type';
import { P } from 'vitest/dist/reporters-OH1c16Kq';

export type ContextmenuItemType = {
    // 名称
    name: string;
    // 图标
    icon: string;
    // 点击事件
    onClick: (option: {
        readonly contextmenuItem: Readonly<ContextmenuItemType>;
    }) => void;
    // 禁用状态
    disabled: boolean;
    // 隐藏状态
    hidden: boolean;
    // 子菜单
    children: ContextmenuType | null;
    // 下侧分割线
    underDivider: boolean;
};

export type PartialContextmenuItemType =
    Omit<ContextmenuItemType, 'icon' | 'disabled' | 'hidden' | 'children' | 'underDivider'>
    & Partial<Pick<ContextmenuItemType, 'icon' | 'disabled' | 'hidden' | 'underDivider'>>
    & {
        children?: PartialContextmenuType | null;
    };

export type ContextmenuType = ContextmenuItemType[];

export type PartialContextmenuType = PartialContextmenuItemType[];

export type ContextmenuPropsType = {
    contextmenu: ContextmenuType;
    top: number;
    left: number;
};

export type ContextmenuProps = CreateProps<ContextmenuPropsType>;

export interface ContextmenuHTMLElement extends HTMLElement {
    __contextmenu?: {
        contextmenuHandler: (e: MouseEvent) => void;
        clickOutsideHandler: (e: MouseEvent) => void;
    }
}
