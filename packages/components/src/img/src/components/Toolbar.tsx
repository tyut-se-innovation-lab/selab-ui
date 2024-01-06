import { VNode, defineComponent } from 'vue';
import { previewToolbarProps } from '../image';
import { PreviewToolbarProps } from '../image.d';

export default defineComponent({
    name: 'se-img',
    props: previewToolbarProps,
    setup(props, { emit }): () => VNode {
        console.log('previewToolbarProps', props);
        // 显示的内容
        const content: { [key: string]: boolean } = {};
        ['zoom', 'rotate', 'reset', 'flip', 'download', 'pagination'].forEach(
            (item) => {
                content[item] = props[item as keyof PreviewToolbarProps]
                    ? true
                    : false;
            }
        );
        return () => {
            return (
                <div>
                    <ul>
                        {content.zoom && (
                            <li>
                                <button onClick={() => emit('zoom', 'out')}>
                                    小
                                </button>
                                <button onClick={() => emit('zoom', 'in')}>
                                    大
                                </button>
                            </li>
                        )}
                        {content.rotate && (
                            <li>
                                <button
                                    onClick={() => emit('rotate', 'forward')}
                                >
                                    左旋
                                </button>
                                <button
                                    onClick={() => emit('rotate', 'reverse')}
                                >
                                    右旋
                                </button>
                            </li>
                        )}
                        {content.flip && (
                            <li>
                                <button
                                    onClick={() => emit('flip', 'horizontal')}
                                >
                                    水平翻转
                                </button>
                                <button
                                    onClick={() => emit('flip', 'vertical')}
                                >
                                    垂直翻转
                                </button>
                            </li>
                        )}
                        {content.reset && (
                            <li>
                                <button onClick={() => emit('reset')}>
                                    重置
                                </button>
                            </li>
                        )}
                        {content.download && (
                            <li>
                                <button onClick={() => emit('download')}>
                                    下载
                                </button>
                            </li>
                        )}
                        {props.total > 1 && (
                            <li>
                                <button onClick={() => emit('change', 'prev')}>
                                    上一张
                                </button>
                                <button onClick={() => emit('change', 'next')}>
                                    下一张
                                </button>
                            </li>
                        )}
                        {content.pagination && props.total > 1 && (
                            <li>
                                {props.index.value + 1} / {props.total}
                            </li>
                        )}
                    </ul>
                </div>
            );
        };
    }
});
