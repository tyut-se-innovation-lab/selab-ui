import { ContextmenuType, ContextmenuHTMLElement } from './contextmenu.d';
import { clickOutside } from '@selab-ui/utils';
import { check } from './method';

export default {
    mounted(
        el: ContextmenuHTMLElement,
        { value }: { value: ContextmenuType | boolean }
    ) {
        console.log('contextmenu mounted value', value);
        const checkResult = check(value);
        console.log('contextmenu mounted checkResult', checkResult);
        const contextmenuHandler = (() => {
            console.log('contextmenu mounted');
            if (checkResult === false) return (e: MouseEvent) => e.preventDefault();
            else if (checkResult === true) return () => {};
            else
                return (e: MouseEvent) => {
                    e.preventDefault();
                    console.log('contextmenu 自定义 contextmenu');
                };
        })();
        const clickOutsideHandler = (() => {
            if (typeof checkResult === 'boolean') return () => {};
            else
                return () => {
                    console.log('contextmenu 自定义 clickOutside');
                };
        })();
        el.__contextmenu = {
            contextmenuHandler,
            clickOutsideHandler
        };
        el.addEventListener(
            'contextmenu',
            el.__contextmenu!.contextmenuHandler
        );
        clickOutside.mounted(el, {
            value: clickOutsideHandler,
            arg: [el.parentNode]
        });
    },
    beforeUnmount(el: ContextmenuHTMLElement) {
        console.log('contextmenu beforeUnmount');
        console.dir(el);
        el.removeEventListener(
            'contextmenu',
            el.__contextmenu!.contextmenuHandler
        );
        delete el.__contextmenu;
        clickOutside.beforeUnmount(el);
    }
};
