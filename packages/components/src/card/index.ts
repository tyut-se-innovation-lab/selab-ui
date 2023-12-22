import _card from './template/card.jsx';
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
export const card = withInstall(_card);
export default card;
