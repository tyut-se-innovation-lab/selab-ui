import { defineComponent, computed, VNode } from "vue";
import '../../less/components/Tooltip/index.less'
export default defineComponent({
  name: "se-Tooltip",
  props: {
    type: String
  },
  setup(props, { slots }): () => VNode {
    const TooltipStyle = computed(() => {
      return props.type ? { ["se-Tooltip--" + props.type]: true } : {};
    });
    return () => (
          <div class={`se-Tooltip ${TooltipStyle.value ? Object.keys(TooltipStyle.value).join(' ') : ''}`}>
        {slots.default && slots.default()}
      </div>
    );
  }
}); 