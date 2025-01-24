<template>
  <div>
    <!-- 加粗的大标题 -->
    <se-typography type="h1" bold color="blue"> 加粗的大标题 </se-typography>

    <!-- 斜体的段落文字 -->
    <se-typography type="p" italic size="16px">
      这是一个斜体段落
    </se-typography>

    <!-- 带下划线的居中文字 -->
    <se-typography type="span" underline align="center" color="green">
      居中的带下划线文本
    </se-typography>

    <!-- 删除线和不可选中的文本 -->
    <se-typography strikethrough unselectable>
      删除线不可选中文本
    </se-typography>
  </div>
</template>

<script setup></script>
