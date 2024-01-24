import { App, VNode, createVNode, render } from 'vue';
import { COMPInstallWithContext, COMPWithInstall, _createVNode } from './type';

export const testFun = (a: number, b: number): number => {
    return a + b;
};
// type DebouncedFunction<T extends (...args: any[]) => void> = (
//     ...args: Parameters<T>
// ) => void;

export const clickOutside = {
    mounted(el: any, binding: any) {
        function eventHandler(e: MouseEvent) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.value && typeof binding.value === 'function') {
                binding.value(e);
            }
        }

        // 用于销毁前注销事件监听
        el.__click_outside__ = eventHandler;
        // 添加事件监听
        document.addEventListener('click', eventHandler);
    },
    beforeUnmount(el: any) {
        // 移除事件监听
        document.removeEventListener('click', el.__click_outside__);
        // 删除无用属性
        delete el.__click_outside__;
    }
};

export const getStyle = (): ['info', 'success', 'warning', 'danger'] => [
    'info',
    'success',
    'warning',
    'danger'
];

let pupOpsMountDom: HTMLDivElement | null = null;

/** (创建)返回全局窗口挂载节点 */
function pupOpsMount(): {
    /** 用于直接在根节点添加子节点(div) */
    mountDiv: (childDom: HTMLElement) => () => void;
    /** 用于vNode节点渲染 */
    render: (vNode: VNode) => () => void;
    /** 用于组件实例的创建和渲染 */
    createVNode: typeof _createVNode;
};
function pupOpsMount() {
    if (!pupOpsMountDom) {
        pupOpsMountDom = document.createElement('div') as HTMLDivElement;
        pupOpsMountDom.id = '__se_window_mount__';
        pupOpsMountDom.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            z-index: 9999;
        `;
        document.body.appendChild(pupOpsMountDom);
    }

    function mountDiv(childDom: HTMLDivElement) {
        if (
            childDom.style.position === 'relative' ||
            childDom.style.position === 'static' ||
            childDom.style.position === 'sticky' ||
            !childDom.style.position
        ) {
            if (childDom.style.position !== 'static' && childDom.style.position)
                console.warn('弹窗组件的节点必须是absolute或fixed定位');
            childDom.style.position = 'absolute';
        }
        pupOpsMountDom?.appendChild(childDom);

        function unmount() {
            unmountDiv(childDom);
        }

        return unmount.bind(null);
    }

    function unmountDiv(childDom: HTMLDivElement) {
        pupOpsMountDom?.removeChild(childDom);
    }

    function renderPupOp(vNode: VNode) {
        const childDom = document.createElement('div');
        childDom.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
        `;
        mountDiv(childDom);
        render(vNode, childDom);

        let isRendered = true;

        function unmount() {
            if (isRendered) {
                render(null, childDom);
                unmountDiv(childDom);
                isRendered = false;
            }
        }

        return unmount.bind(null);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function createVNodePupOp(type: any, props?: any) {
        const vNode = createVNode(type, props);
        let _unmount = renderPupOp(vNode);

        let isRendered = true;

        function render() {
            if (isRendered) return;
            _unmount = renderPupOp(vNode);
            isRendered = true;
        }

        function unmount() {
            if (isRendered) {
                _unmount();
                isRendered = false;
            }
        }

        return {
            vNode,
            unRender: unmount.bind(null),
            render: render.bind(null)
        };
    }

    return {
        mountDiv: mountDiv.bind(null),
        render: renderPupOp.bind(null),
        createVNode: createVNodePupOp.bind(null)
    };
}

export { pupOpsMount };

/** 获取字符串长度(px) */
export const getStringWidth = (msg: string, fontSize?: number): number => {
    const stringWidthDom = document.createElement('span');
    stringWidthDom.innerHTML = msg;
    stringWidthDom.style.position = 'absolute';
    stringWidthDom.style.left = '-9999px';
    if (fontSize) stringWidthDom.style.fontSize = fontSize + 'px';
    else stringWidthDom.style.fontSize = 'initial';
    document.body.appendChild(stringWidthDom);
    const width = stringWidthDom.offsetWidth;
    document.body.removeChild(stringWidthDom);
    return width;
};

/** 获取静态vNode的高度(px) */
export const getVNodeHeight = (vNode: VNode): number => {
    const boxHeightDom = document.createElement('div');
    boxHeightDom.style.position = 'absolute';
    boxHeightDom.style.left = '-9999px';
    render(vNode, boxHeightDom);
    document.body.appendChild(boxHeightDom);
    const height = boxHeightDom.offsetHeight;
    render(null, boxHeightDom);
    document.body.removeChild(boxHeightDom);
    return height;
};

/** 获取不同尺寸对应的缩放比例 */
export const getSizeMap = (
    size: 'large' | 'small' | 'mini' | 'default'
): number => {
    switch (size) {
        case 'large':
            return 1.2;
        case 'small':
            return 0.8;
        case 'mini':
            return 0.6;
        default:
            return 1;
    }
};

export const withInstall = <T>(fn: T) => {
    (fn as COMPWithInstall<T>).install = (app: App) => {
        const name = (fn as COMPWithInstall<T> & { name: string }).name;
        // 注册组件
        app.component(name, fn as COMPWithInstall<T>);
    };
    return fn as COMPWithInstall<T>;
};

export const withInstallFunction = <T>(fn: T, name: string) => {
    (fn as COMPWithInstall<T>).install = (app: App) => {
        (fn as COMPInstallWithContext<T>)._context = app._context;
        app.config.globalProperties[name] = fn;
    };
    return fn as COMPInstallWithContext<T>;
};

export function debounce(fn: (...arg: any[]) => any, duration: number = 300) {
    let timer = -1;
    return function (this: unknown, ...args: any[]) {
        if (timer > -1) {
            clearTimeout(timer);
        }
        timer = window.setTimeout(() => {
            fn.apply(this, args);
            timer = -1;
        }, duration);
    };
}
