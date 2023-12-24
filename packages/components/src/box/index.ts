import _Box from './template/box';
import type { App, Plugin } from 'vue';
type SFCWithInstall<T> = T & Plugin;
const withInstall = <T>(comp: T) => {
    (comp as SFCWithInstall<T>).install = (app: App) => {
        const name = (comp as any).name;
        // 注册组件
        app.component(name, comp as SFCWithInstall<T>);
    };
    return comp as SFCWithInstall<T>;
};
export const Box = withInstall(_Box);
export default Box;
