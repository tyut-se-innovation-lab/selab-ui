import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import button from '../template/button.vue';

// 要测试的组件
describe('Button 组件', () => {
    it('应该渲染默认插槽的文本', () => {
        const wrapper = mount(button, {
            slots: {
                default: 'selab'
            }
        });

        // 断言组件的渲染文本
        expect(wrapper.text()).toContain('selab');
    });

    it('在未提供插槽内容时应该渲染默认插槽的文本', () => {
        const wrapper = mount(button);

        // 断言在未提供插槽内容时组件的渲染文本
        expect(wrapper.text()).toContain('Default Text');
    });

    it('在未提供 type 属性时应该有默认的 type 类', () => {
        const wrapper = mount(button);

        // 断言默认 type 类是否存在
        expect(wrapper.classes()).toContain('se-button--default');
    });

    it('应该根据提供的 type 属性添加相应的类', () => {
        const wrapper = mount(button, {
            props: {
                type: 'primary'
            }
        });

        // 断言根据提供的 type 属性添加的类是否存在
        expect(wrapper.classes()).toContain('se-button--primary');
    });

    it('在点击时应该触发 click 事件', async () => {
        const wrapper = mount(button);

        // 触发按钮的点击事件
        await wrapper.trigger('click');

        // 断言是否触发了 click 事件
        expect(wrapper.emitted().click).toBeTruthy();
    });

    // it('如果未提供点击事件处理程序，应该有默认的点击事件处理程序', async () => {
    //     const wrapper = mount(button);
    //
    //     // 触发按钮的点击事件
    //     await wrapper.trigger('click');
    //
    //     // 断言是否调用了默认的点击事件处理程序
    //     // 根据实际组件行为进行调整
    //     // 这里只是一个占位符/示例
    //     // 使用断言告诉 TypeScript emitted() 的返回类型
    //     const emitted = wrapper.emitted() as { [eventName: string]: any[] };
    //     // 断言 'click' 事件是否存在，并验证具体的值
    //     expect('click' in emitted).toBe(true);
    //     expect(emitted.click[0][0]).toBe('Default Click Handler');
    // });
});
