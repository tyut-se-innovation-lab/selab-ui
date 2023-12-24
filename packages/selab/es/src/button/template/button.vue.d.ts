declare const _sfc_main: import("vue").DefineComponent<{
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
}>>, {}, {}>;
export default _sfc_main;
