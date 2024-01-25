type ContextmenuItemType = {
    // 名称
    name: string;
    // 图标
    icon: string;
    // 点击事件
    onClick: (option: {
        readonly contextmenuItem: Readonly<ContextmenuItemType>;
        event: MouseEvent;
    }) => void;
    // 禁用状态
    disabled: boolean;
    // 隐藏状态
    hidden: boolean;
    // 子菜单
    children: ContextmenuType;
    // 下侧分割线
    divider: boolean;
};

export type ContextmenuType = Array<ContextmenuItemType>;

export type ContextmenuPropsType = {
    contextmenu: ContextmenuType;
};

export type ContextmenuProps = CreateProps<ContextmenuPropsType>;