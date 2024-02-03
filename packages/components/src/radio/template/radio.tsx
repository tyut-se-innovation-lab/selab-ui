import { defineComponent, computed, VNode, ref } from "vue";
import '../../less/components/radio/index.less'
import { radioProps } from "./types";
export default defineComponent({
  name: "se-radio",
  props: radioProps,
  setup(props, { slots }): () => VNode {
    const radioStyle = computed(() => {
      return props.size ? { ["se-radio--" + props.size]: true } : {};
    });
    const selectedOption = ref<String | Number | Boolean | null>(null);
    const handleChange = (value: String | Number | Boolean | null) => {
      selectedOption.value = value;
    }
    return () => (
      <div class={`se-radio ${radioStyle.value ? Object.keys(radioStyle.value).join(' ') : ''}`}>
        {props.options.map((option, index) => (
          <label key={index} class={`se-radio-label`}>
            <input
              type="radio"
              name={`se-radio-group${props.name ? 'props.name' : ''}`}
              class={`se-radio-round ${props.disable ? 'disabled' : ''}`}
              value={option}
              v-model={selectedOption}
              onChange={() => handleChange(option)}
              disabled={props.disable}
            ></input>
            <p
              class={`se-radio-text ${props.disable ? 'disabled' : ''}`}
            >{option}</p>
          </label>
        ))}

        {slots.default && slots.default()}
      </div>
    );
  }
}); 