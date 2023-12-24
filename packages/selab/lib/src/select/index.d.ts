import type { Plugin } from "vue";
declare type SFCWithInstall<T> = T & Plugin;
export declare const Select: SFCWithInstall<import("vue").DefineComponent<{
    placeholder: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    options: {
        type: ArrayConstructor;
        required: true;
    };
    multiple: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    autoClearSearchValue: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    selectProps: any;
    searchValue: import("vue").Ref<string>;
    filterOptions: import("vue").ComputedRef<any>;
    selectOptionsShow: import("vue").Ref<boolean>;
    searchTags: import("vue").Ref<any[]>;
    searchValueInput: (e: Event) => void;
    clickOutside: () => void;
    selectOptionsItemClick: (item: any) => void;
    removeTag: (item: any) => void;
    selectDropSize: import("vue").Ref<number>;
    inputRef: import("vue").Ref<HTMLInputElement | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    placeholder: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    options: {
        type: ArrayConstructor;
        required: true;
    };
    multiple: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    autoClearSearchValue: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>>, {
    placeholder: string;
    multiple: boolean;
    autoClearSearchValue: boolean;
}, {}>>;
export default Select;
