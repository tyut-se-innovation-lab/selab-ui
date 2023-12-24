import * as components from './src/index';
import { App, Plugin } from 'vue';
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
                app.directive('click-outside', clickOutside);
            }
        }
    }
};

export default myPlugin;
