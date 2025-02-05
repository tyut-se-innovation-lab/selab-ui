import { defineComponent, ref, computed, PropType, onMounted, onBeforeUnmount } from "vue";
import '../../less/components/cascader/index.less';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

export default defineComponent({
  name: "SeCascader",
  props: {
    options: {
      type: Array as PropType<Option[]>,
      required: true
    },
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  emits: ['update:modelValue', 'change', 'select'],
  setup(props, { emit }) {
    const selectedValue = ref<any[]>([]); // 存储选中的值
    const selectedOptions = ref<Option[]>([]); // 存储每层已选项
    const currentOptions = ref<Option[]>(props.options); // 当前可选项
    const currentLevel = ref(0); // 当前选择的层级
    const isDropdownVisible = ref(false); // 控制下拉框是否显示
    const cascaderRef = ref<HTMLElement | null>(null); // 组件根节点

    // 选中的值（路径）
    const selectedLabel = computed(() => selectedValue.value.join(' / '));

    // 切换下拉框显示
    const toggleDropdown = () => {
      isDropdownVisible.value = !isDropdownVisible.value;
    };

    // 处理选择事件
    const handleSelect = (option: Option, level: number) => {
      // 更新当前层级的选中项
      selectedValue.value[level] = option.label;
      selectedOptions.value[level] = option;

      // 触发选中事件
      emit('select', option.value);

      // 如果有子选项，进入下一级
      if (option.children && option.children.length > 0) {
        currentOptions.value = option.children;
        currentLevel.value = level + 1;
      } else {
        // 如果没有子选项，结束选择
        emit('change', selectedValue.value);
        isDropdownVisible.value = false; // 关闭下拉框
      }
    };

    // 处理删除选项
    const handleRemove = () => {
      selectedValue.value = []; // 删除所有已选项
      selectedOptions.value = []; // 清空已选项
      currentOptions.value = props.options; // 重置为初始选项
      currentLevel.value = 0; // 还原层级
    };

    // 渲染当前层级的选项
    const renderOptions = (options: Option[], level: number) => {
      return options.map(option => (
          <div
              class={`se-cascader-option ${selectedOptions.value[level]?.value === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option, level)}
          >
            {option.label}
          </div>
      ));
    };

    // 渲染输入框
    const renderInput = () => {
      return (
          <div class="se-cascader-input" onClick={toggleDropdown}>
            <input
                type="text"
                placeholder={props.placeholder}
                value={selectedLabel.value}
                readonly
            />
            {selectedValue.value.length > 0 && (
                <button class="se-cascader-clear" onClick={handleRemove}>
                  ✖
                </button>
            )}
          </div>
      );
    };

    // 监听全局点击事件，点击外部时关闭下拉框
    const handleClickOutside = (event: MouseEvent) => {
      if (cascaderRef.value && !cascaderRef.value.contains(event.target as Node)) {
        isDropdownVisible.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return () => (
        <div ref={cascaderRef} class="se-cascader">
          {renderInput()}

          {isDropdownVisible.value && (
              <div class="se-cascader-dropdown">
                {renderOptions(currentOptions.value, currentLevel.value)}
              </div>
          )}
        </div>
    );
  }
});
