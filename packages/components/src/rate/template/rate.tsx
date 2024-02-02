import { defineComponent, computed, VNode } from "vue";
import '../../less/components/rate/index.less'
export default defineComponent({
  name: "se-rate",
  props: {
    type: String
  },
  setup(props, { slots }): () => VNode {
    const rateStyle = computed(() => {
      return props.type ? { ["se-rate--" + props.type]: true } : {};
    });
    return () => (
          <div class={`se-rate ${rateStyle.value ? Object.keys(rateStyle.value).join(' ') : ''}`}>
        {slots.default && slots.default()}
      </div>
    );
  }
}); 