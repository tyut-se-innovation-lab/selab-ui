
import '../../less/components/table/index.less'
import { defineComponent, ref, computed, onMounted } from "vue";


export default defineComponent({
  name: "se-table",
  props: {
    rows: {
      type: Array,
      required: true,
    },
    rowHeight: {
      type: Number,
      default: 50,
    },
    visibleCount: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { slots }) {
    const scrollTop = ref(0);

    const startIndex = computed(() => Math.floor(scrollTop.value / props.rowHeight));
    const endIndex = computed(() => startIndex.value + props.visibleCount);

    const visibleRows = computed(() => {
      return props.rows.slice(startIndex.value, endIndex.value);
    });

    const totalHeight = computed(() => props.rows.length * props.rowHeight);

    const onScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      scrollTop.value = target.scrollTop;
    };

    onMounted(() => {
      console.log("SeTable mounted");
    });

    return () => (
        <div class="se-table-container" onScroll={onScroll}>
          <div class="se-table-spacer" style={{ height: `${totalHeight.value}px` }}></div>
          <div
              class="se-table-viewport"
              style={{ transform: `translateY(${startIndex.value * props.rowHeight}px)` }}
          >
            {visibleRows.value.map((row, index) => (
                <div class="se-table-row" style={{ height: `${props.rowHeight}px` }}>
                  {slots.default ? slots.default({ row, index: startIndex.value + index }) : JSON.stringify(row)}
                </div>
            ))}
          </div>
        </div>
    );
  },
});
