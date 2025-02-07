<template>

  <se-empty type="no-data">
    <div>没有数据哦</div>
  </se-empty>

  <se-empty type="no-content">
    <div>暂无内容</div>
  </se-empty>

  <!-- 还可以不传type，默认没有样式 -->
  <se-empty>
    <div>正在加载...</div>
  </se-empty>
</template>


<script>

</script>

<style scoped>
.se-empty{
  margin-top: 10px;
}
</style>
