import { mount } from '@vue/test-utils';
import box from '../template/box'; // 请根据实际路径调整
import { describe, expect, it } from 'vitest';

describe('box Test', () => {
    // 测试：组件能正确渲染
    it('renders component properly', () => {
        const wrapper = mount(box);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.classes()).toContain('se-box'); // 检查默认类名
        expect(wrapper.text()).toBe('Default content'); // 检查默认插槽内容
    });

    // 测试：type 属性应用正确的类名
    it('applies the correct type class when type prop is provided', () => {
        const wrapper = mount(box, {
            props: {
                type: 'primary'
            }
        });
        expect(wrapper.classes()).toContain('se-box--primary');
    });

    // 测试：支持多种类型组合
    it('applies multiple type classes when type is an array', () => {
        const wrapper = mount(box, {
            props: {
                type: ['primary', 'large']
            }
        });
        expect(wrapper.classes()).toContain('se-box--primary');
        expect(wrapper.classes()).toContain('se-box--large');
    });

    // 测试：动态标签
    it('renders the correct tag based on the tag prop', () => {
        const wrapper = mount(box, {
            props: {
                tag: 'section'
            }
        });
        expect(wrapper.element.tagName.toLowerCase()).toBe('section');
    });

    // 测试：自定义类名
    it('applies custom classes from customClass prop', () => {
        const wrapper = mount(box, {
            props: {
                customClass: 'my-custom-class'
            }
        });
        expect(wrapper.classes()).toContain('my-custom-class');
    });

    // 测试：透传属性
    it('passes additional attributes to the root element', () => {
        const wrapper = mount(box, {
            attrs: {
                id: 'custom-id',
                style: 'color: red;'
            }
        });
        expect(wrapper.attributes('id')).toBe('custom-id');
        expect(wrapper.attributes('style')).toBe('color: red;');
    });

    // 测试：插槽内容渲染
    it('renders slot content correctly', () => {
        const wrapper = mount(box, {
            slots: {
                default: 'Slot content'
            }
        });
        expect(wrapper.text()).toBe('Slot content');
    });

    // 测试：插槽未定义时的默认内容
    it('renders default content when no slot is provided', () => {
        const wrapper = mount(box);
        expect(wrapper.text()).toBe('Default content');
    });
});
