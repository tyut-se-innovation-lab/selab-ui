import { defineComponent, computed, ref, PropType, watch } from "vue";
import { checkboxProps } from "./types.ts";
import "../../less/components/checkbox/index.less";

export default defineComponent({
  name: "se-checkbox",
  props: checkboxProps,
  setup(props, { slots, emit }) {
    // Store selected options
    const selectedOptions = ref<Array<string | number>>(props.modelValue || []);

    // Computed class for size
    const checkboxStyle = computed(() => {
      return props.size ? `se-checkbox--${props.size}` : "";
    });

    // Watch modelValue to keep in sync
    watch(
      () => props.modelValue,
      (newValue) => {
        selectedOptions.value = newValue || [];
      },
    );

    // Handle checkbox change
    const handleChange = (value: string | number) => {
      const index = selectedOptions.value.indexOf(value);
      if (index === -1) {
        selectedOptions.value.push(value);
      } else {
        selectedOptions.value.splice(index, 1);
      }
      emit("update:modelValue", selectedOptions.value);
      emit("change", selectedOptions.value);
    };

    // Handle select all
    const selectAll = () => {
      selectedOptions.value = [...props.options!];
      emit("update:modelValue", selectedOptions.value);
    };

    // Handle deselect all
    const deselectAll = () => {
      selectedOptions.value = [];
      emit("update:modelValue", selectedOptions.value);
    };

    return () => (
      <div class={`se-checkbox ${checkboxStyle.value}`}>
        {/* Select All Button */}
        <div class="se-checkbox-select-all">
          <button
            type="button"
            onClick={selectAll}
            disabled={
              props.disabled ||
              selectedOptions.value.length === props.options!.length
            }
          >
            {props.checkAllText}
          </button>
          <button
            type="button"
            onClick={deselectAll}
            disabled={props.disabled || selectedOptions.value.length === 0}
          >
            清除
          </button>
        </div>

        {/* Render checkboxes */}
        {props.options!.map((option, index) => (
          <label key={index} class="se-checkbox-label">
            <input
              type="checkbox"
              class={`se-checkbox-square ${props.disabled ? "disabled" : ""}`}
              value={option}
              checked={selectedOptions.value.includes(option)}
              onChange={() => handleChange(option)}
              disabled={props.disabled}
            />
            <span
              class={`se-checkbox-text ${props.disabled ? "disabled" : ""}`}
            >
              {option}
            </span>
          </label>
        ))}

        {/* Custom slot to display selected options */}
        {slots.default && slots.default()}
      </div>
    );
  },
});
