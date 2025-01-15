<template>
  <div>
    <h1>虚拟滚动表格示例</h1>
    <se-table :rows="tableData" :rowHeight="40" :visibleCount="15">
      <!-- 自定义行内容 -->
      <template #default="{ row, index }">
        <div class="custom-row">
          <span>第 {{ index + 1 }} 行：</span>
          <span>{{ row.name }}</span>
          <span>{{ row.age }} 岁</span>
        </div>
      </template>
    </se-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'TableExample',
  data() {
    return {
      // 模拟大数据
      tableData: Array.from({ length: 1000 }, (_, i) => ({
        name: `用户${i + 1}`,
        age: Math.floor(Math.random() * 50) + 20,
      })),
    };
  },
});
</script>

<style scoped>
/* 外层样式 */
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.se-table-container {
  width: 400px;
  height: 600px;
  overflow-y: auto;
  border: 1px solid #ddd;
  margin: 0 auto;
}

.se-table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}

.custom-row span {
  margin-right: 10px;
}
</style>
