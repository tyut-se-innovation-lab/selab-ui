import { defineComponent, computed, ref } from 'vue';
import '../../less/components/VirtualScroller/index.less'

export default defineComponent({
  name: 'seVirtualScroller',
  props: {
    items: {
      type: Array as () => Array<{ value: string | number; label: string }>,
      required: true,
    },
    itemHeight: {
      type: Number,
      required: true,
    },
    visibleCount: {
      type: Number,
      default: 10, // 默认可见项数量
    },
    onItemClick: {
      type: Function,
      default: (item: { value: string | number; label: string }) => {}, // 点击事件的默认空函数
    },
  },
  setup(props) {
    const scrollTop = ref(0);
    const containerRef = ref<HTMLDivElement | null>(null);

    // 起始和结束索引
    const startIndex = computed(() => Math.floor(scrollTop.value / props.itemHeight));
    const endIndex = computed(() => Math.min(startIndex.value + props.visibleCount, props.items.length));

    // 可见的选项
    const visibleItems = computed(() => props.items.slice(startIndex.value, endIndex.value));

    // 总高度和偏移量
    const totalHeight = computed(() => props.items.length * props.itemHeight);
    const translateY = computed(() => startIndex.value * props.itemHeight);

    // 滚动事件
    const onScroll = () => {
      if (containerRef.value) {
        scrollTop.value = containerRef.value.scrollTop;
      }
    };

    // 处理点击事件
    const handleItemClick = (item: { value: string | number; label: string }) => {
      props.onItemClick(item); // 调用父组件传递的点击事件处理函数
    };

    return {
      containerRef,
      onScroll,
      visibleItems,
      totalHeight,
      translateY,
      handleItemClick,
    };
  },
  render() {
    return (
        <div
            class="virtual-scroller-container"
            ref="containerRef"
            onScroll={this.onScroll}
        >
          {/* 占位高度 */}
          <div class="virtual-scroller-phantom" style={{ height: `${this.totalHeight}px` }}></div>
          {/* 可视内容 */}
          <div
              class="virtual-scroller-content"
              style={{ transform: `translateY(${this.translateY}px)` }}
          >
            {this.visibleItems.map((item) => (
                <div
                    class="virtual-scroller-item"
                    key={item.value}
                    onClick={() => this.handleItemClick(item)} // 为每个项添加点击事件
                >
                  {item.label}
                </div>
            ))}
          </div>
        </div>
    );
  },
});
