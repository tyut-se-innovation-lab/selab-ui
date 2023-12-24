<<<<<<< HEAD
import _Card from './template/card.tsx';
import type { App, Plugin } from 'vue';
=======
import _card from "./template/card";
import type { App, Plugin } from "vue";
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
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
export const Card = withInstall(_Card);
export default Card;
=======
export const Card = withInstall(_card);
export default Card;
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
