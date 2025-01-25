import { defineComponent, ref, watch, onMounted, h } from 'vue';

export default defineComponent({
  name: 'SeLayout',
  props: {
    collapsed: {
      type: Boolean,
      default: true, // 默认收缩
    },
  },
  emits: ['update:collapsed'],
  setup(props, { emit, slots }) {
    const isCollapsed = ref(props.collapsed);
    const siderWidth = ref(isCollapsed.value ? '20px' : '200px');
    const siderOffset = ref(isCollapsed.value ? '-200px' : '0px');

    // 切换侧边栏收缩状态
    const toggleCollapsed = () => {
      isCollapsed.value = !isCollapsed.value;
      siderWidth.value = isCollapsed.value ? '20px' : '200px';
      siderOffset.value = isCollapsed.value ? '-200px' : '0px';
      emit('update:collapsed', isCollapsed.value);
    };

    // 监听父组件传入的 collapsed 属性，确保同步
    watch(() => props.collapsed, (newVal) => {
      isCollapsed.value = newVal;
      siderWidth.value = newVal ? '24px' : '200px';
      siderOffset.value = newVal ? '-200px' : '0px';
    });

    // 渲染侧边栏
    const renderSider = () => {
      return (
          <div
              class="layout-sider"
              style={{
                width: siderWidth.value,
                transition: 'width 0.3s ease',
                position: 'absolute',  // 相对于父容器定位
                top: '0',
                left: siderOffset.value,
                height: '100%',
                backgroundColor: '#333',
                color: '#fff',
                overflow: 'hidden',
                zIndex: 1000,
              }}
          >
            <div
                class="sider-toggle"
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '16px',
                  width: '32px',
                  height: '32px',
                  background: '#444',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                onClick={toggleCollapsed}
            >
              {isCollapsed.value ? '▶' : '◀'}
            </div>
            <div class="sider-content" style={{ padding: '20px' }}>
              {slots.sider ? slots.sider() : '侧边栏内容'}
            </div>
          </div>
      );
    };

    // 渲染主内容区域
    const renderMain = () => {
      return (
          <div
              class="layout-main"
              style={{
                marginLeft: isCollapsed.value ? '64px' : '200px',
                transition: 'margin-left 0.3s ease',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                paddingLeft: isCollapsed.value ? '20px' : '0px', // 保证主内容区域始终与侧边栏对齐
              }}
          >
            <div class="layout-header" style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
              {slots.header ? slots.header() : '顶部导航栏'}
            </div>
            <div class="layout-content" style={{ flex: 1, padding: '20px' }}>
              {slots.content ? slots.content() : '主体内容区域'}
            </div>
            <div class="layout-footer" style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
              {slots.footer ? slots.footer() : '底部区域'}
            </div>
          </div>
      );
    };

    // 渲染按钮，只有在侧边栏收缩时显示
    const renderCollapseButton = () => {
      return (
          <div
              class="collapse-button"
              style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                width: '32px',
                height: '32px',
                background: '#444',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1000,
              }}
              onClick={toggleCollapsed}
          >
            {isCollapsed.value ? '▶' : '◀'}
          </div>
      );
    };

    return () => (
        <div class="layout-container" style={{ display: 'flex', flexDirection: 'row', position: 'relative', width: '100%' }}>
          {renderSider()}
          {renderMain()}
          {isCollapsed.value && renderCollapseButton()}
        </div>
    );
  },
});
