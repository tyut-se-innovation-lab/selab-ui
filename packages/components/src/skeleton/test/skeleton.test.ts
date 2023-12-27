import { mount } from '@vue/test-utils';
import skeleton from '../template/skeleton.vue';
import { describe, expect, it } from 'vitest';
describe('skeleton Test', () => {
    it('renders component properly', () => {
        const wrapper = mount(skeleton);
        // Add your test logic here
    });
});
