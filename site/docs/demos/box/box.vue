<template>
  <div>
    <!-- 案例 1：基础使用 -->
    <se-box type="primary">这是一个 Primary 类型的 Box</se-box>

    <!-- 案例 2：带有自定义类型 -->
    <se-box type="secondary">这是一个 Secondary 类型的 Box</se-box>

    <!-- 案例 3：动态标签 -->
    <se-box type="success" tag="section"
      >这是一个使用 Section 标签的 Box</se-box
    >

    <!-- 案例 4：自定义类名 -->
    <se-box type="warning" customClass="custom-style"
      >带有自定义类名的 Box</se-box
    >

    <!-- 案例 5：动态插槽内容 -->
    <se-box type="info">
      <template #default>
        <p>插槽内容可以是任意的 HTML 或组件。</p>
        <button>这是一个按钮</button>
      </template>
    </se-box>
  </div>
</template>

<style scoped>
/* 示例：自定义样式 */
.custom-style {
  border: 2px dashed red;
  padding: 10px;
}
</style>
