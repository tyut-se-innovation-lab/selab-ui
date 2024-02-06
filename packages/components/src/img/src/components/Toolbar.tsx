import { Ref, VNode, defineComponent, onMounted, ref, watch } from 'vue';
import { previewToolbarProps } from '../image';
import { PreviewToolbarProps } from '../image.d';
import SeIcon from '../../../icon/template/icon.vue';
import { inputAutoFocus } from '@selab-ui/utils';
// import SeTooltip from '../../../tooltip/template/tooltip';
import '../../../less/components/imgPreviewToolbar/index.less';

export default defineComponent({
    name: 'se-img',
    props: previewToolbarProps,
    directives: {
        inputAutoFocus
    },
    setup(props, { emit, expose }): () => VNode {
        const root = ref() as Ref<HTMLDivElement>;
        // 显示的内容
        const content: { [key: string]: boolean } = {};
        ['zoom', 'rotate', 'reset', 'flip', 'download', 'pagination'].forEach(
            (item) => {
                content[item] = props[item as keyof PreviewToolbarProps]
                    ? true
                    : false;
            }
        );
        // 是否无遮罩
        const isNoModal = ref(false);
        // 是否鼠标在内部
        const isMouseIn = ref(false);
        // 是否处于切换中
        const isChanging = ref(false);
        // 是否处于页码输入中
        const isInput = ref(false);
        // 页码输入框的值
        const inputValue = ref(props.index.value + 1);
        /** 当点击页码, 切换为输入框 */
        const changeInput = () => {
            if (isInput.value || props.total === 1 || !props.pagination) return;
            inputValue.value = props.index.value + 1;
            isInput.value = true;
        };
        /** 当输入框提交, 切换为页码 */
        const submitInput = (e: Event) => {
            emit('switch', 'next', e, inputValue.value - 1);
            isInput.value = false;
        };
        /** 当输入框失焦, 放弃操作 */
        const blurInput = () => {
            isInput.value = false;
            inputValue.value = props.index.value + 1;
        };
        onMounted(() => {
            emit(
                'exportToolbarWidth',
                parseFloat(getComputedStyle(root.value).width) + 60
            );
            isNoModal.value = root.value.classList.contains(
                'se-img-preview-toolbar-noModal'
            );
            watch(
                () => props.index.value,
                (v) => {
                    setTimeout(() => {
                        isChanging.value = false;
                        inputValue.value = v;
                        if (!isMouseIn.value) {
                            emit('initToolbarLocation');
                        }
                    }, 300);
                }
            );
            setTimeout(() => {
                if (isNoModal.value) {
                    root.value.addEventListener('mouseleave', () => {
                        setTimeout(() => {
                            !isChanging.value && emit('initToolbarLocation');
                        }, 300);
                        isMouseIn.value = false;
                    });
                    root.value.addEventListener('mouseenter', () => {
                        isMouseIn.value = true;
                    });
                }
            });
        });
        expose({
            _changeError: () => {
                isChanging.value = false;
            },
            _changeInput: changeInput
        });
        return () => {
            return (
                <div class="se-img-preview-toolbar-root" ref={root}>
                    <ul>
                        {content.zoom && (
                            <li>
                                <button onClick={() => emit('zoom', 'out')}>
                                    {/* 使用[color="#"]来规避SeIcon的默认颜色 */}
                                    <SeIcon
                                        name="zoom_out"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                                <button onClick={() => emit('zoom', 'in')}>
                                    <SeIcon
                                        name="zoom_in"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {content.rotate && (
                            <li>
                                <button
                                    onClick={() => emit('rotate', 'forward')}
                                >
                                    <SeIcon
                                        name="rotate_left"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                                <button
                                    onClick={() => emit('rotate', 'reverse')}
                                >
                                    <SeIcon
                                        name="rotate_right"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {content.flip && (
                            <li>
                                <button
                                    onClick={() => emit('flip', 'horizontal')}
                                >
                                    <SeIcon
                                        name="flip_horizontally_card"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                                <button
                                    onClick={() => emit('flip', 'vertical')}
                                >
                                    <SeIcon
                                        name="flip_vertically_card"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {content.reset && (
                            <li>
                                <button onClick={() => emit('reset')}>
                                    <SeIcon
                                        name="sync"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {content.download && (
                            <li>
                                <button onClick={() => emit('download')}>
                                    <SeIcon
                                        name="down"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {props.total > 1 && (
                            <li>
                                <button
                                    onClick={(e: MouseEvent) => {
                                        if (isChanging.value) return;
                                        emit('switch', 'prev', e);
                                        if (
                                            props.index.value === 0 ||
                                            props.index.value ===
                                                props.total - 1
                                        )
                                            return;
                                        isChanging.value = true;
                                    }}
                                >
                                    <SeIcon
                                        name="back"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                                <button
                                    onClick={(e: MouseEvent) => {
                                        if (isChanging.value) return;
                                        emit('switch', 'next', e);
                                        if (
                                            props.index.value === 0 ||
                                            props.index.value ===
                                                props.total - 1
                                        )
                                            return;
                                        isChanging.value = true;
                                    }}
                                >
                                    <SeIcon
                                        name="right"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {isNoModal.value && (
                            <li>
                                <button onClick={() => emit('close')}>
                                    <SeIcon
                                        name="close"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {content.pagination && props.total > 1 && (
                            <li>
                                {!isInput.value && (
                                    <span
                                        onClick={changeInput}
                                        class="se-img-preview-toolbar-pagination"
                                    >
                                        {props.index.value + 1} / {props.total}
                                    </span>
                                )}
                                {isInput.value && (
                                    <form onSubmit={submitInput}>
                                        <input
                                            type="number"
                                            min="1"
                                            max={props.total}
                                            value={props.index.value + 1}
                                            onBlur={blurInput}
                                            onFocus={(e: FocusEvent) =>
                                                e.target &&
                                                (
                                                    e.target as HTMLInputElement
                                                ).select()
                                            }
                                            onInput={(e) =>
                                                (inputValue.value = (
                                                    e.target as HTMLInputElement
                                                ).value)
                                            }
                                            v-inputAutoFocus
                                        />
                                    </form>
                                )}
                            </li>
                        )}
                    </ul>
                </div>
            );
        };
    }
});
