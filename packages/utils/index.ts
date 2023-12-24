export const testFun = (a: number, b: number): number => {
    return a + b;
};

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
