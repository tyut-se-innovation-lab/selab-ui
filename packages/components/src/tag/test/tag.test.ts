import { mount } from '@vue/test-utils';
<<<<<<< HEAD
import tag from '../template/se-tag.vue';
import { describe, expect, it } from 'vitest';
describe('se-tag Test', () => {
    it('应该渲染默认插槽的文本', () => {
        const wrapper = mount(tag, {
            slots: {
                default: 'selab'
            }
        });

        // 断言组件的渲染文本
        expect(wrapper.text()).toContain('selab');
    });

    it('在未提供插槽内容时应该渲染默认插槽的文本', () => {
        const wrapper = mount(tag);

        // 断言在未提供插槽内容时组件的渲染文本
        expect(wrapper.text()).toContain('Default Text');
    });

    it('在未提供 type 属性时应该有默认的 type 类', () => {
        const wrapper = mount(tag);

        // 断言默认 type 类是否存在
        expect(wrapper.classes()).toContain('se-button--default');
    });

    it('应该根据提供的 type 属性添加相应的类', () => {
        const wrapper = mount(tag, {
            props: {
                type: 'primary'
            }
        });

        // 断言根据提供的 type 属性添加的类是否存在
        expect(wrapper.classes()).toContain('se-button--primary');
    });

    it('在点击时应该触发 click 事件', async () => {
        const wrapper = mount(tag);

        // 触发按钮的点击事件
        await wrapper.trigger('click');

        // 断言是否触发了 click 事件
        expect(wrapper.emitted().click).toBeTruthy();
    });
});
=======
import tag from '../template/tag.vue';
import { describe, expect, it } from 'vitest';
describe('tag Test', () => {
  it('renders component properly', () => {
    const wrapper = mount(tag);
    // Add your test logic here
  });
});
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
