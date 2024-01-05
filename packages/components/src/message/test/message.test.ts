import message from '../src/method';
import { describe, expect, it } from 'vitest';

// describe('Message Test', () => {
//     it('should render message', () => {
//         const wrapper = message({
//             message: 'Hello, world!',
//             type: 'success',
//             duration: 3000,
//             icon: 'check',
//             showClose: true,
//             group: false,
//             beforeClose: (close: () => void) => close(),
//             onCloseClick: () => {}
//         });
//         expect(wrapper).toContain('Hello, world!');
//     });
// });

describe('message', () => {
    it('基础用法, 只传递message: string', () => {
        const wrapper = message('test');
        // console.log(document.getElementsByClassName('se-msg')[0]);
        expect(wrapper).toEqual({
            close: () => {
                // vm.exposed!.closeVisible();
            }
        });
        // expect(document.getElementsByClassName('se-msg')[0]).not.toBeNull();
        // expect(
        //     document.getElementsByClassName('se-msg')[0].childNodes[1]
        //         .childNodes[0].textContent
        // ).toBe('test');
    });
});
