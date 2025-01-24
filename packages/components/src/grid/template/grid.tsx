import { defineComponent, computed, VNode } from "vue";
import '../../less/components/grid/index.less'
export default defineComponent({
  name: "se-grid",
  props: {
    type: String
  },
  setup(props, { slots }): () => VNode {
    const gridStyle = computed(() => {
      return props.type ? { ["se-grid--" + props.type]: true } : {};
    });
    return () => (
          <div class={`se-grid ${gridStyle.value ? Object.keys(gridStyle.value).join(' ') : ''}`}>
        {slots.default && slots.default()}
      </div>
    );
  }
}); 