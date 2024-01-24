import type {
    AppContext,
    ComponentOptions,
    ComponentPublicInstance,
    Plugin,
    PropType,
    VNode,
    VNodeProps,
    VNodeTypes
} from 'vue';

export type COMPWithInstall<T> = T & Plugin;

export type COMPInstallWithContext<T> = COMPWithInstall<T> & {
    _context: AppContext | null;
};

export type CreateProps<T> = {
    [K in keyof T]: {
        type: PropType<T[K]>;
        default: T[K];
        required?: boolean;
    };
};

export declare interface ClassComponent {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): ComponentPublicInstance<any, any, any, any, any>;
    __vccOpts: ComponentOptions;
}

export declare function _createVNode(
    type: VNodeTypes | ClassComponent,
    props?: (Record<string, unknown> & VNodeProps) | null
): {
    vNode: VNode;
    unRender: () => void;
    render: () => void;
};
