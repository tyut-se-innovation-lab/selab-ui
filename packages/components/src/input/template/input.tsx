import { defineComponent, ref, watch, toRefs } from 'vue';
import '../../less/components/input/index.less';

export default defineComponent({
    name: 'SeInput',
    props: {
        modelValue: {  // 使用 modelValue 来支持 v-model
            type: [String, Number, Array],  // 支持 String, Number 和 Array 类型
            default: '',
        },
        placeholder: {
            type: String,
            default: '请输入内容...',
        },
        icon: {
            type: String, // 图标名称，例如 'search' 或 'close'
            default: '',
        },
        allowClear: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'default', // 可选值：small, default, large
        },
        bordered: {
            type: Boolean,
            default: true,
        },
        prefix: {
            type: String,
            default: '', // 前缀图标名称
        },
        suffix: {
            type: String,
            default: '', // 后缀图标名称
        },
        type: {
            type: String,
            default: 'text', // 默认是 text 类型，你可以传递其他类型，比如 password, number
        },
    },
    setup(props, { emit }) {
        const { modelValue } = toRefs(props);
        const inputValue = ref(modelValue.value); // 输入框的值

        // 监听 inputValue 的变化，并同步到外部的 modelValue
        watch(inputValue, (newValue) => {
            emit('update:modelValue', newValue); // 触发 update:modelValue 事件
            console.log(newValue)
        });

        const clearInput = () => {
            inputValue.value = '';
            emit('clear');
        };

        const handleFocus = (event: any) => {
            emit('focus', event);
        };

        const handleBlur = (event: any) => {
            emit('blur', event);
        };

        return {
            inputValue,
            clearInput,
            handleFocus,
            handleBlur,
        };
    },
    render() {
        const sizeClass = `input-${this.size}`;
        const borderedClass = this.bordered ? 'input-bordered' : 'input-no-border';
        const disabledClass = this.disabled ? 'input-disabled' : '';

        return (
            <div class={['input-container', sizeClass, borderedClass, disabledClass]}>
                {this.prefix && <se-icon icon={this.prefix} color="gray" class="prefix-icon" />}
                <input
                    type={this.type}
                    class="input-field"
                    placeholder={this.placeholder}
                    value={Array.isArray(this.inputValue) ? this.inputValue.join(', ') : this.inputValue}  // 处理多选情况
                    onInput={(event: Event) => {
                        const target = event.target as HTMLInputElement; // 明确类型
                        const value = target?.value || ''; // 确保安全获取 value 值

                        // 判断 inputValue 是否是数组类型
                        if (Array.isArray(this.inputValue)) {
                            // 将输入值按照逗号分隔，去除多余空格
                            this.inputValue = value.split(',').map(val => val.trim());
                        } else {
                            // 直接存储输入值
                            this.inputValue = value;
                        }
                    }}
                    disabled={this.disabled}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
                {this.suffix && <se-icon icon={this.suffix} color="gray" class="suffix-icon" />}
                {this.allowClear && this.inputValue && (
                    <se-icon icon="cuida:x-outline" class="clear-icon" color="gray" onClick={this.clearInput} />
                )}
            </div>
        );
    },
});
