import type { Plugin } from "vue";
declare type SFCWithInstall<T> = T & Plugin;
export declare const card: SFCWithInstall<import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        required: false;
    };
}, {
    cardProps: {
        type?: string | undefined;
    };
    buttonStyle: import("vue").ComputedRef<{
        [x: string]: string | undefined;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        required: false;
    };
}>>, {}>>;
export default card;
