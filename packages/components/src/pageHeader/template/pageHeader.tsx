import { defineComponent, computed, PropType, defineProps, h, VNode } from 'vue';
import '../../less/components/pageHeader/index.less';

export default defineComponent({
  name: 'sePageHeader',
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    subTitle: {
      type: String as PropType<string>,
      default: '',
    },
    back: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    extra: {
      type: [String, Object] as PropType<string | VNode>,
      default: '',
    },
  },
  setup(props, { emit }) {
    // 计算是否显示返回按钮
    const hasBack = computed(() => props.back);

    // 触发返回自定义事件
    const onBack = () => {
      emit('back');
    };

    return () => (
        <div class={['se-page-header', { 'se-page-header--with-back': hasBack.value }]}>
          {/* Back Button */}
          {hasBack.value && (
              <div class="se-page-header-back" onClick={onBack}>
                <se-icon icon="tabler:arrow-left" color={"#666"} size={24} />
              </div>
          )}
          {/* Page Title and Subtitle */}
          <div class="se-page-header-content">
            <h1 class="se-page-header-title">{props.title}</h1>
            {props.subTitle && <p class="se-page-header-subtitle">{props.subTitle}</p>}
          </div>
          {/* Extra Content */}
          {props.extra && <se-button class="se-page-header-extra">{props.extra}</se-button>}
        </div>
    );
  },
});
