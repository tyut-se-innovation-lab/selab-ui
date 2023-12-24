import type { Plugin } from "vue";
declare type SFCWithInstall<T> = T & Plugin;
export declare const Skeleton: SFCWithInstall<import("vue").DefineComponent<{
    avatarShow: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    rows: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    active: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    titleWidth: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, {
    skeletonProps: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    avatarShow: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    rows: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    active: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    titleWidth: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>>, {
    avatarShow: boolean;
    rows: number;
    active: boolean;
    titleWidth: string;
}, {}>>;
export default Skeleton;
