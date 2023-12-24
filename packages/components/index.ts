import * as components from './src/index';
import { clickOutside } from '../utils/index';
import { App, Plugin } from 'vue';

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

export * from './src/index';

export default myPlugin;
