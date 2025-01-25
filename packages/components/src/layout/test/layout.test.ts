import { mount } from '@vue/test-utils';
import layout from '../template/layout';
import { describe, expect, it } from 'vitest';
describe('layout Test', () => {
  it('renders component properly', () => {
    const wrapper = mount(layout);
    // Add your test logic here
  });
});