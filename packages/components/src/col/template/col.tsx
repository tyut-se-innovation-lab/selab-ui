import { defineComponent, computed, VNode } from "vue";
import '../../less/components/col/index.less'
export default defineComponent({
  name: "se-col",
  props: {
    type: String
  },
  setup(props, { slots }): () => VNode {
    const colStyle = computed(() => {
      return props.type ? { ["se-col--" + props.type]: true } : {};
    });
    return () => (
          <div class={`se-col ${colStyle.value ? Object.keys(colStyle.value).join(' ') : ''}`}>
        {slots.default && slots.default()}
      </div>
    );
  }
}); 