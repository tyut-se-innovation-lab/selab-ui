import { defineComponent, computed, toRefs } from "vue";
import "../../less/components/anchor/index.less";

// 定义锚点项接口
interface AnchorItem {
  text: string;
  link: string;
  icon?: string;  // 可选图标属性
  active?: boolean;  // 可选活动状态
  targetId?: string; // 新增 targetId，用来表示点击后滚动到的目标元素的 ID
}

export default defineComponent({
  name: "SeAnchor",
  props: {
    items: {
      type: Array as () => AnchorItem[],
      required: true,
      default: () => [],
    },
    type: {
      type: String,
      default: "", // 默认为竖直方向
    },
  },
  setup(props, { emit }) {
    const { items } = toRefs(props);

    // 根据传入的type，生成样式，支持水平和竖直布局
    const anchorStyle = computed(() => {
      return props.type === "horizontal" ? "se-anchor--horizontal" : "se-anchor--vertical";
    });

    // 点击锚点时的处理方法
    const handleAnchorClick = (item: AnchorItem) => {
      // 触发自定义事件，传递当前锚点的数据
      emit("anchor-clicked", item);
      if (item.targetId) {
        const targetElement = document.getElementById(item.targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    return () => (
        <div class={`se-anchor ${anchorStyle.value}`}>
          {items.value.map((item, index) => (
              <div class="se-anchor-link" key={index} onClick={() => handleAnchorClick(item)}>
                {/* 如果传入了图标，展示图标 */}
                {item.icon && (
                    <se-icon icon={item.icon} size={16} color="#666" style={{ marginTop: "8px"}} />
                )}
                {/* 链接文本 */}
                <a href={item.link} class={{ active: item.active }}>
                  {item.text}
                </a>
              </div>
          ))}
        </div>
    );
  },
});
