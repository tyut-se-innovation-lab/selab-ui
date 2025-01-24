<template>
  <div id="app">
    <!-- 打开对话框的按钮 -->
    <button @click="isDialogVisible = true">打开对话框</button>

    <!-- 使用 SeDialog 组件 -->
    <SeDialog
      v-model:visible="isDialogVisible"
      title="自定义标题"
      :width="'50%'"
      :top="'10vh'"
      :closeable="true"
      @close="handleDialogClose"
    >
      <!-- 自定义标题 -->
      <template #title>
        <span style="color: #007bff; font-weight: bold">插槽自定义标题</span>
      </template>

      <!-- 默认插槽内容 -->
      <p>这是对话框的主要内容部分。你可以在这里放置任何 HTML 或文本。</p>

      <!-- 自定义页脚 -->
      <template #footer>
        <button @click="isDialogVisible = false" class="btn btn-close">
          关闭
        </button>
        <button @click="confirmAction" class="btn btn-confirm">确认</button>
      </template>
    </SeDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 控制对话框显示状态
const isDialogVisible = ref(false);

// 关闭对话框的回调
const handleDialogClose = () => {
  console.log("对话框已关闭");
  isDialogVisible.value = false;
};

// 确认操作的回调
const confirmAction = () => {
  console.log("确认操作执行");
  isDialogVisible.value = false;
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.btn-close {
  background-color: #6c757d;
}

button.btn-confirm {
  background-color: #28a745;
}

button:hover {
  opacity: 0.9;
}
</style>
