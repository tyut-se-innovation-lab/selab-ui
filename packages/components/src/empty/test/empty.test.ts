import { mount } from '@vue/test-utils';
import empty from '../template/empty';
import { describe, expect, it } from 'vitest';
describe('empty Test', () => {
  it('renders component properly', () => {
    const wrapper = mount(empty);
    // Add your test logic here
  });
});