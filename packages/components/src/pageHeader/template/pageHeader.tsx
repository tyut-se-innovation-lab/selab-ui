import { defineComponent, computed, VNode } from "vue";
import '../../less/components/pageHeader/index.less'
export default defineComponent({
  name: "se-pageHeader",
  props: {
    type: String
  },
  setup(props, { slots }): () => VNode {
    const pageHeaderStyle = computed(() => {
      return props.type ? { ["se-pageHeader--" + props.type]: true } : {};
    });
    return () => (
          <div class={`se-pageHeader ${pageHeaderStyle.value ? Object.keys(pageHeaderStyle.value).join(' ') : ''}`}>
        {slots.default && slots.default()}
      </div>
    );
  }
}); 