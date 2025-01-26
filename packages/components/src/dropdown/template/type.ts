 export interface MenuItem {
    label: string;
    icon?: string; // 可选属性，可能有，也可能没有
}

export interface Props {
    type: string;
    trigger: string;
    placement: string;
    disabled: boolean;
    menuItems: MenuItem[]; // 修改 menuItems 为 MenuItem 数组
}
