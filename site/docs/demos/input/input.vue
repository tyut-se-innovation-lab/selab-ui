<template>
  <div class="demo-container">
    <h3>默认输入框</h3>
    <SeInput placeholder="请输入内容..." />

    <h3>带图标的输入框</h3>
    <SeInput placeholder="搜索..." prefix="cuida:search-outline" />

    <h3>允许清除的输入框</h3>
    <SeInput placeholder="可清除输入内容" allowClear />

    <h3>禁用状态</h3>
    <SeInput placeholder="禁用状态" disabled />

    <h3>带前缀和后缀的输入框</h3>
    <SeInput placeholder="带前缀" prefix="cuida:search-outline" />
    <SeInput placeholder="带后缀" suffix="cuida:settings-outline" />
    <SeInput placeholder="带前缀和后缀" prefix="cuida:search-outline" suffix="cuida:settings-outline" />

    <h3>不同大小的输入框</h3>
    <SeInput placeholder="小尺寸" size="small" />
    <SeInput placeholder="默认尺寸" size="default" />
    <SeInput placeholder="大尺寸" size="large" />

    <h3>无边框输入框</h3>
    <SeInput placeholder="无边框样式" :bordered="false" />

    <h3>事件监听</h3>
    <SeInput
        placeholder="监听事件"
        allowClear
        @focus="onFocus"
        @blur="onBlur"
        @clear="onClear"
    />
  </div>
</template>

<script>

export default {

  methods: {
    onFocus(event) {
      console.log('输入框聚焦', event);
    },
    onBlur(event) {
      console.log('输入框失焦', event);
    },
    onClear() {
      console.log('清除内容');
    },
  },
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

h3 {
  margin-top: 20px;
  font-size: 16px;
  color: #333;
}

</style>
