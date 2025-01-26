import { defineComponent, computed, VNode } from "vue";
import '../../less/components/dropdown/index.less'
export default defineComponent({
  name: "se-dropdown",
  props: {
    type: String
  },
  setup(props, { slots }): () => VNode {
    const dropdownStyle = computed(() => {
      return props.type ? { ["se-dropdown--" + props.type]: true } : {};
    });
    return () => (
          <div class={`se-dropdown ${dropdownStyle.value ? Object.keys(dropdownStyle.value).join(' ') : ''}`}>
        {slots.default && slots.default()}
      </div>
    );
  }
}); 