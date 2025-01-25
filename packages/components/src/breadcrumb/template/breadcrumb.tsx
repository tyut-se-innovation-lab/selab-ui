import { defineComponent, computed, PropType, VNode } from 'vue';
import '../../less/components/breadcrumb/index.less';


interface BreadcrumbItem {
  text: string;
  link?: string;
  icon?: string;  // 新增图标属性
}

export default defineComponent({
  name: 'SeBreadcrumb',
  props: {
    type: {
      type: String as PropType<string>,
      default: '',
    },
    items: {
      type: Array as PropType<BreadcrumbItem[]>,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    // 根据传入的items生成面包屑数据
    const breadcrumbItems = computed(() => props.items);

    // 根据传入的type，生成样式
    const breadcrumbStyle = computed(() => {
      return props.type ? `se-breadcrumb--${props.type}` : '';
    });

    return () => (
        <div class={`se-breadcrumb ${breadcrumbStyle.value}`}>
          {breadcrumbItems.value.map((item, index) => (
              <span class="se-breadcrumb-item" key={index}>
            {/* 如果有图标，显示图标 */}
                {item.icon && (
                    <se-icon style={{marginTop:'6px'}} icon={item.icon} size={20} color="#666" />
                )}
                {item.link ? (
                    <a href={item.link}>{item.text}</a>
                ) : (
                    <span>{item.text}</span>
                )}
                {/* 显示分隔符 */}
                {index < breadcrumbItems.value.length - 1 && (
                    <span class="se-breadcrumb-separator">/</span>
                )}
          </span>
          ))}
          {/* 插槽：允许外部插入自定义内容 */}
          {slots.default && slots.default()}
        </div>
    );
  },
});
