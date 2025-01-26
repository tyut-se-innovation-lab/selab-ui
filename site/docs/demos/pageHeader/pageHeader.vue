<template >
  <sePageHeader
      title="页面标题"
      subTitle="副标题内容"
      :back="true"
      extra="其他操作"
      @back="handleBack"
  >
  <template #extra>
    <button @click="onSave">保存</button>
  </template>
  </sePageHeader>
</template>

<script setup>

const handleBack = () => {
  console.log('触发自定义的返回事件');
  // 在这里执行自定义的返回操作
  // 比如你可以使用 `window.history.back()` 或其他逻辑
};

const onSave = () => {
  alert('保存按钮点击');
};
</script>
