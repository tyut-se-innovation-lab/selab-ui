import type { Plugin } from 'vue';
declare type SFCWithInstall<T> = T & Plugin;
export declare const Button: SFCWithInstall<import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        required: false;
    };
    onClick: {
        type: FunctionConstructor;
        required: false;
    };
}, {
    props: any;
    buttonStyle: import("vue").ComputedRef<{
        [x: string]: boolean;
    }>;
    defaultClickHandler: string;
    clickHandler: {
        value: string;
    };
    handleClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        required: false;
    };
    onClick: {
        type: FunctionConstructor;
        required: false;
    };
}>>, {}, {}>>;
export default Button;
