import { defineComponent, computed, ref } from "vue";
import "../../less/components/VirtualScroller/index.less";

export default defineComponent({
  name: "SeVirtualScroller",
  props: {
    items: {
      type: Array as () => Array<{ value: string | number; label: any }>,
      required: true,
    },
    itemHeight: {
      type: Number,
      required: true,
    },
    visibleCount: {
      type: Number,
      default: 10,
    },
    onItemClick: {
      type: Function,
      default: null,
    },
    containerHeight: {
      type: Number,
      required: true,
    },
    isTable: {
      type: Boolean,
      default: false, // 是否按表格渲染
    },
  },
  setup(props) {
    const scrollTop = ref(0);
    const containerRef = ref<HTMLDivElement | null>(null);

    // 计算开始和结束索引
    const startIndex = computed(() =>
      Math.floor(scrollTop.value / props.itemHeight),
    );
    const endIndex = computed(() =>
      Math.min(startIndex.value + props.visibleCount, props.items.length),
    );

    // 获取可见项
    const visibleItems = computed(() =>
      props.items.slice(startIndex.value, endIndex.value),
    );

    // 计算总高度
    const totalHeight = computed(() => props.items.length * props.itemHeight);
    const translateY = computed(() => startIndex.value * props.itemHeight);

    // 滚动事件处理
    const onScroll = () => {
      if (containerRef.value) {
        scrollTop.value = containerRef.value.scrollTop;
      }
    };

    // 处理点击事件
    const handleItemClick = (item: { value: string | number; label: any }) => {
      if (props.onItemClick) {
        props.onItemClick(item);
      }
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
        style={{
          height: `${this.containerHeight}px`,
          overflowY: "auto",
          position: "relative",
        }} // 固定容器高度
      >
        {/* 占位层：用于占据虚拟滚动的总高度 */}
        <div
          class="virtual-scroller-phantom"
          style={{
            height: `${this.totalHeight}px`,
            position: "absolute",
            width: "100%",
          }}
        ></div>

        {/* 内容区域：根据当前滚动位置来平移 */}
        <div
          class="virtual-scroller-content"
          style={{
            transform: `translateY(${this.translateY}px)`,
            position: "relative",
            width: "100%",
          }}
        >
          {this.visibleItems.map((item) => (
            <div
              class="virtual-scroller-item"
              key={item.value}
              onClick={() => this.handleItemClick(item)}
              style={{
                height: `${this.itemHeight}px`,
                display: "flex",
                alignItems: "center",
              }} // 每一项的高度固定
            >
              {this.isTable ? (
                // 如果是表格，逐一渲染表格列
                Object.values(item.label).map((val, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      border: "1px solid #ccc",
                      padding: "4px",
                      textAlign: "center",
                    }}
                  >
                    {val}
                  </div>
                ))
              ) : (
                // 如果不是表格，直接渲染 label
                <div>{item.label}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
});
