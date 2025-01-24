import { defineComponent, ref, computed, watch } from "vue";
import "../../less/components/select/index.less";

export default defineComponent({
  name: "SeSelect",
  props: {
    options: {
      type: Array as () => Array<{ value: string | number; label: string }>,
      required: true,
    },
    placeholder: {
      type: String,
      default: "请输入内容...",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    enableVirtualScroll: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const inputValue = ref("");
    const selectedOptions = ref<{ value: string | number; label: string }[]>(
      [],
    );
    const dropdownVisible = ref(false);
    const scrollContainer = ref<HTMLElement | null>(null);

    const filteredOptions = computed(() => {
      const filtered = !inputValue.value
        ? props.options
        : props.options.filter((option) =>
            option.label.toLowerCase().includes(inputValue.value.toLowerCase()),
          );

      return filtered.map((option) => ({
        ...option,
        disabled: selectedOptions.value.some(
          (selected) => selected.value === option.value,
        ),
      }));
    });

    const handleInputFocus = () => {
      dropdownVisible.value = true;
    };

    const handleOptionClick = (option: {
      value: string | number;
      label: string;
      disabled?: boolean;
    }) => {
      if (option.disabled) return;

      if (props.multiple) {
        if (
          !selectedOptions.value.some(
            (selected) => selected.value === option.value,
          )
        ) {
          selectedOptions.value.push(option);
        }
        inputValue.value = "";
      } else {
        selectedOptions.value = [option];
        inputValue.value = option.label;
        dropdownVisible.value = false;
      }
    };

    const handleTagRemove = (tag: {
      value: string | number;
      label: string;
    }) => {
      selectedOptions.value = selectedOptions.value.filter(
        (selected) => selected.value !== tag.value,
      );
      inputValue.value = "";
    };

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        scrollContainer.value &&
        !scrollContainer.value.contains(target) &&
        !(target as HTMLElement).classList.contains("input-field")
      ) {
        dropdownVisible.value = false;
      }
    };

    watch(dropdownVisible, (newValue) => {
      if (newValue) {
        document.addEventListener("click", handleOutsideClick);
      } else {
        document.removeEventListener("click", handleOutsideClick);
      }
    });

    watch(inputValue, (newValue) => {
      if (!props.multiple && newValue === "") {
        selectedOptions.value = [];
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
    const {
      multiple,
      placeholder,
      inputValue,
      selectedOptions,
      dropdownVisible,
      filteredOptions,
      handleInputFocus,
      handleOptionClick,
      handleTagRemove,
    } = this;

    return (
      <div class="input-with-virtual-dropdown">
        {/* 输入框和多选标签 */}
        <div class="input-container" onClick={handleInputFocus}>
          {multiple ? (
            <>
              {selectedOptions.map((tag) => (
                <se-tag key={tag.value} onClose={() => handleTagRemove(tag)}>
                  {tag.label}
                </se-tag>
              ))}
              <input
                type="text"
                class="input-field"
                placeholder={placeholder}
                value={inputValue}
                onInput={(e) =>
                  (this.inputValue = (e.target as HTMLInputElement).value)
                }
                onFocus={handleInputFocus}
                onClick={(e) => e.stopPropagation()}
              />
            </>
          ) : (
            <input
              type="text"
              class="input-field"
              placeholder={selectedOptions.length > 0 ? "" : placeholder}
              value={inputValue}
              onInput={(e) =>
                (this.inputValue = (e.target as HTMLInputElement).value)
              }
              onFocus={handleInputFocus}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>

        {/* 下拉框 */}
        {dropdownVisible && (
          <div
            class="dropdown"
            ref={(el) => (this.scrollContainer = el as any)}
            onClick={(e) => e.stopPropagation()}
          >
            {this.enableVirtualScroll ? (
              <se-virtual-scroller
                items={filteredOptions}
                itemHeight={40}
                visibleCount={10}
                onItemClick={handleOptionClick}
                containerHeight={300}
              />
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  class={[
                    "dropdown-item",
                    { "dropdown-item-disabled": option.disabled },
                  ]}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  },
});
