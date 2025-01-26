import { defineComponent, computed, VNode } from "vue";
import '../../less/components/pagination/index.less'
export default defineComponent({
  name: "se-pagination",
  props: {
    type: String
  },
  setup(props, { slots }): () => VNode {
    const paginationStyle = computed(() => {
      return props.type ? { ["se-pagination--" + props.type]: true } : {};
    });
    return () => (
          <div class={`se-pagination ${paginationStyle.value ? Object.keys(paginationStyle.value).join(' ') : ''}`}>
        {slots.default && slots.default()}
      </div>
    );
  }
}); 