<template>
  <div>
    <!-- 圆形成功标签 -->
    <se-tag
        type="success"
        shape="round"
        size="small"
        closeable
        show
        @close="onClose"
        @click="onClick"
    >
      成功标签
    </se-tag>

    <!-- 方形警告标签 -->
    <se-tag
        type="warning"
        shape="square"
        size="medium"
        closeable
        @click="onTagClick"
    >
      警告标签
    </se-tag>

    <!-- 自定义关闭图标标签 -->
    <se-tag
        type="info"
        closeable
        size="large"
        @close="onClose"
    >
      <template #closeIcon>
        <span>❌</span>
      </template>
      信息标签
    </se-tag>
  </div>
</template>

<script lang="ts" setup>

const onClose = () => {
  console.log('Tag closed!');
};

const onClick = () => {
  console.log('Tag clicked!');
};

const onTagClick = () => {
  console.log('Tag click event triggered!');
};
</script>
