import { App, VNode, render } from 'vue';
import { COMPInstallWithContext, COMPWithInstall } from './type';

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

// (创建)返回全局窗口挂载节点
export const getPupOpsMountedLocation = (): HTMLDivElement => {
    const id = '__se_window_mounted__';
    let dom = document.getElementById(id);
    if (!dom) {
        dom = document.createElement('div');
        dom.id = id;
        dom.style.position = 'absolute';
        dom.style.top = '0';
        dom.style.left = '0';
        document.body.appendChild(dom);
    }

    return dom;
};

export const getStringWidth = (msg: string, fontSize?: number): number => {
    const stringWidthDom = document.createElement('span');
    stringWidthDom.innerHTML = msg;
    stringWidthDom.style.position = 'absolute';
    stringWidthDom.style.left = '-9999px';
    fontSize && (stringWidthDom.style.fontSize = fontSize + 'px');
    document.body.appendChild(stringWidthDom);
    const width = stringWidthDom.offsetWidth;
    document.body.removeChild(stringWidthDom);
    return width;
};

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

export const getSizeMap = (size: string): number => {
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
