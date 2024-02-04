import * as components from './src/index';
import { App, Plugin } from 'vue';
import SeMsg from './src/message/src/method';
import SeMiniMsg from './src/miniMsg/src/index';
import seCreateAlbum from './src/img/src/method';
import { clickOutside } from '../utils/index';

export * from './src/index';

const myPlugin: Plugin = {
    install: (app: App): void => {
        for (const componentName in components) {
            if (
                Object.prototype.hasOwnProperty.call(components, componentName)
            ) {
                const component =
                    components[componentName as keyof typeof components];
                app.use(component);
            }
        }
        app.directive('click-outside', clickOutside);
    }
};

export { SeMsg, SeMiniMsg, seCreateAlbum };

export default myPlugin;
