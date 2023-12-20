import * as components from './src/index';
import { App, Plugin } from 'vue';

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
    }
};

export default myPlugin;
