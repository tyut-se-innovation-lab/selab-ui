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
<<<<<<< HEAD
export const Box = withInstall(_Box);
=======
export const Box = withInstall(_box);
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
export default Box;
