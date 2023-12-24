import type { Plugin } from "vue";
declare type SFCWithInstall<T> = T & Plugin;
export declare const Tag: SFCWithInstall<import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        required: false;
    };
    closeable: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    show: import("vue").Ref<boolean>;
    slots: Readonly<{
        [name: string]: import("vue").Slot<any> | undefined;
    }>;
    emits: (event: "close" | "click", ...args: any[]) => void;
    tagProps: any;
    tagClick: () => void;
    tagCloseClick: () => void;
    tagStyle: import("vue").ComputedRef<string[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "click")[], "close" | "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        required: false;
    };
    closeable: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    closeable: boolean;
}, {}>>;
export default Tag;
