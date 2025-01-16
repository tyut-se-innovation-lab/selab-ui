// types.ts 或直接在当前文件中定义

// 选择框的属性
export interface ISelectProps {
    placeholder?: string; // 占位符
    options: ISelectOption[]; // 选项数组
    multiple?: boolean; // 是否多选
    autoClearSearchValue?: boolean; // 是否自动清除搜索值
    modelValue: string | number | string[] | number[] | null; // 绑定的值，可以是单个值或多个值
    filterable?: boolean; // 是否允许过滤
    filterMethod?: (value: string) => ISelectOption[]; // 过滤方法
    queryMethod?: (value: string) => any; // 远程查询方法
    remote?: boolean; // 是否远程查询
    loading?: boolean; // 是否加载中
}

// 选择框的选项
export interface ISelectOption {
    value: string | number; // 选项值
    label: string; // 选项标签
}
