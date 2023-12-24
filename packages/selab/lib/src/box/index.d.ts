import type { Plugin } from 'vue';
declare type SFCWithInstall<T> = T & Plugin;
export declare const Box: SFCWithInstall<import("vue").DefineComponent<{
    type: StringConstructor;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: StringConstructor;
}>>, {}, {}>>;
export default Box;
