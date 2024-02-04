import { defineComponent, computed, VNode, ref } from "vue";
import '../../less/components/checkbox/index.less'
import { checkboxProps } from './types';
export default defineComponent({
  name: "se-checkbox",
  props: checkboxProps,
  setup(props, { slots }): () => VNode {
    const checkboxStyle = computed(() => {
      return props.size ? { ["se-checkbox--" + props.size]: true } : {};
    });
    const selectedOptions = ref<Array<String | Number | Boolean | null>>([]);
    const handleChange = (value: String | Number | Boolean | null) => {
      const index = selectedOptions.value.indexOf(value);
      if (index == -1) {
        selectedOptions.value.push(value);
      } else {
        selectedOptions.value.splice(index, 1);
      }
    }

    return () => (
      <div class={`se-checkbox ${checkboxStyle.value ? Object.keys(checkboxStyle.value).join(' ') : ''}`}>
        {props.options.map((option, index) => (
          <label
            key={index}
            class={`se-checkbox-label`}
          >
            <input
              type="checkbox"
              class={`se-checkbox-square ${props.disabled ? 'disabled' : ''}`}
              value={option}
              onChange={() => handleChange(option)}
              disabled={props.disabled}
            />
            <p
              class={`se-checkbox-text ${props.disabled ? 'disabled' : ''}`}
            >
              {option}
            </p>
          </label>
        ))}


        {slots.default && slots.default()}
      </div>
    );
  }
}); 