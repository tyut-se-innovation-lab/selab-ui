import { mount } from '@vue/test-utils';
import card from '../template/card.jsx';
import { describe, expect, it } from 'vitest';
describe('card Test', () => {
    it('renders component properly', () => {
        const wrapper = mount(card);
        // Add your test logic here
    });
});
