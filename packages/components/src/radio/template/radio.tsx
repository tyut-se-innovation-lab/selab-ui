import { defineComponent, computed, VNode, ref } from "vue";
import "../../less/components/radio/index.less";
import { radioProps } from "./types";
export default defineComponent({
  name: "se-radio",
  props: radioProps,
  setup(props, { slots }): () => VNode {
    const radioStyle = computed(() => {
      return props.size ? { ["se-radio--" + props.size]: true } : {};
    });
    const selectedOption = ref<string | number | boolean | null>(null);
    const handleChange = (value: string | number | boolean | null) => {
      selectedOption.value = value;
    };
    return () => (
      <div
        class={`se-radio ${radioStyle.value ? Object.keys(radioStyle.value).join(" ") : ""}`}
      >
        {props.options.map((option, index) => (
          <label key={index} class={`se-radio-label`}>
            <input
              type="radio"
              name={`se-radio-group${props.name ? props.name : ""}`}
              class={`se-radio-round ${props.disabled ? "disabled" : ""}`}
              value={option}
              v-model={selectedOption}
              onChange={() => handleChange(option)}
              disabled={props.disabled}
            ></input>
            <p class={`se-radio-text ${props.disabled ? "disabled" : ""}`}>
              {option}
            </p>
          </label>
        ))}

        {slots.default && slots.default()}
      </div>
    );
  },
});
