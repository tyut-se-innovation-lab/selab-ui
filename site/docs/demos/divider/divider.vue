<template>
  <div>
    <!-- 基本水平分隔线 -->
    <h3>基本水平分隔线</h3>
    <se-divider />

    <!-- 虚线分隔线 -->
    <h3>虚线分隔线</h3>
    <se-divider dashed />

    <!-- 垂直分隔线 -->
    <h3>垂直分隔线</h3>
    <div style="display: flex; align-items: center">
      Text <se-divider type="vertical" /> Text
    </div>

    <!-- 带内容的分隔线 -->
    <h3>带内容的分隔线</h3>
    <se-divider content="Left Content" orientation="left" />
    <se-divider content="Center Content" />
    <se-divider content="Right Content" orientation="right" />

    <!-- 插槽内容的分隔线 -->
    <h3>插槽内容的分隔线</h3>
    <se-divider orientation="center">
      <strong>Custom Content</strong>
    </se-divider>
  </div>
</template>
