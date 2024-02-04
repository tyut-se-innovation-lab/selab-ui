import { RendererNode, createVNode } from 'vue';
import { ContextmenuType, ContextmenuHTMLElement } from './contextmenu.d';
import { clickOutside, pupOpsMount } from '@selab-ui/utils';
import { check } from './method';
import SeContextmenu from './contextmenu.tsx';

export default {
    mounted(
        el: ContextmenuHTMLElement,
        { value }: { value: ContextmenuType | boolean }
    ) {
        const checkResult = check(value);
        console.log('contextmenu mounted', checkResult);
        const { render: pRender } = pupOpsMount();
        let unmount = null;
        const contextmenuNodes: RendererNode[] = [];
        const contextmenuHandler = (() => {
            console.log('contextmenu mounted');
            if (checkResult === false)
                return (e: MouseEvent) => e.preventDefault();
            else if (checkResult === true) return () => {};
            else
                return (e: MouseEvent) => {
                    e.preventDefault();
                    const contextmenuNode = createVNode(SeContextmenu, {
                        contextmenu: checkResult,
                        top: e.clientY,
                        left: e.clientX
                    });
                    unmount && unmount();
                    unmount = pRender(contextmenuNode);
                    contextmenuNodes[0] = contextmenuNode.el!;
                    console.log(contextmenuNodes);
                    console.log('contextmenu 自定义 contextmenu');
                };
        })();
        const clickOutsideHandler = (() => {
            if (typeof checkResult === 'boolean') return () => {};
            else
                return (e: MouseEvent) => {
                    if (contextmenuNodes.length === 0) return;
                    console.log('contextmenu 自定义 clickOutside', e.target);
                    unmount && unmount();
                    unmount = null;
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
            arg: contextmenuNodes
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
