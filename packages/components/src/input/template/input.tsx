import { defineComponent, ref, computed, watch } from 'vue';
import '../../less/components/input/index.less';

export default defineComponent({
    name: 'SeInput',
    props: {
        options: {
            type: Array as () => Array<{ value: string | number; label: string }>,
            required: true,
        },
        placeholder: {
            type: String,
            default: 'Enter text...',
        },
        multiple: {
            type: Boolean,
            default: false, // 是否多选
        },
        enableVirtualScroll: {
            type: Boolean,
            default: false, // 是否启用虚拟滚动
        },
    },
    setup(props) {
        const inputValue = ref(''); // 输入框的值
        const selectedOptions = ref<{ value: string | number; label: string }[]>([]); // 已选选项
        const dropdownVisible = ref(false); // 下拉框显示状态
        const scrollContainer = ref<HTMLElement | null>(null); // 下拉框容器引用

        // 根据输入框内容过滤选项
        const filteredOptions = computed(() => {
            if (!inputValue.value) return props.options;
            return props.options.filter((option) =>
                option.label.toLowerCase().includes(inputValue.value.toLowerCase())
            );
        });

        // 显示下拉框
        const handleInputFocus = () => {
            dropdownVisible.value = true;
        };

        // 点击选项时的处理
        const handleOptionClick = (option: { value: string | number; label: string }) => {
            if (props.multiple) {
                // 多选模式：添加到已选选项
                if (!selectedOptions.value.some((selected) => selected.value === option.value)) {
                    selectedOptions.value.push(option);
                }
                inputValue.value = ''; // 清空输入框
            } else {
                // 单选模式：更新输入框值并关闭下拉框
                selectedOptions.value = [option];
                inputValue.value = option.label;
                dropdownVisible.value = false;
            }
        };

        // 删除选中的标签（仅多选模式有效）
        const handleTagRemove = (tag: { value: string | number; label: string }) => {
            selectedOptions.value = selectedOptions.value.filter(
                (selected) => selected.value !== tag.value
            );
        };

        // 点击外部关闭下拉框
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                scrollContainer.value &&
                !scrollContainer.value.contains(target) &&
                !(target as HTMLElement).classList.contains('input-field')
            ) {
                dropdownVisible.value = false;
            }
        };

        // 监听下拉框状态，动态绑定事件
        watch(dropdownVisible, (newValue) => {
            if (newValue) {
                document.addEventListener('click', handleOutsideClick);
            } else {
                document.removeEventListener('click', handleOutsideClick);
            }
        });

        return {
            inputValue,
            selectedOptions,
            dropdownVisible,
            filteredOptions,
            handleInputFocus,
            handleOptionClick,
            handleTagRemove,
            scrollContainer,
        };
    },
    render() {
        return (
            <div class="input-with-virtual-dropdown">
                {/* 输入框与多选标签 */}
                <div
                    class="input-container"
                    onClick={() => this.handleInputFocus()}
                >
                    {this.selectedOptions.map((tag) => (
                        <se-tag
                            key={tag.value}
                            onRemove={() => this.handleTagRemove(tag)}
                        >
                            {tag.label}
                        </se-tag>
                    ))}
                    <input
                        type="text"
                        class="input-field"
                        placeholder={
                            this.selectedOptions.length > 0 ? '' : this.placeholder
                        }
                        v-model={this.inputValue}
                        onFocus={this.handleInputFocus}
                        onClick={(e) => e.stopPropagation()} // 防止冒泡
                    />
                </div>

                {/* 下拉框 */}
                {this.dropdownVisible && (
                    <div
                        class="dropdown"
                        ref="scrollContainer"
                        onClick={(e) => e.stopPropagation()} // 防止冒泡
                    >
                        <se-virtual-scroller
                            items={this.filteredOptions}
                            itemHeight={40}
                            visibleCount={10}
                            keyField="value"
                            onItemClick={this.handleOptionClick}
                        />
                    </div>
                )}
            </div>
        );
    }
});
