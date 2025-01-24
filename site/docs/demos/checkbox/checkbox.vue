<template>
  <div class="checkbox-demo">
    <h3>Checkbox 示例</h3>

    <!-- 使用 se-checkbox 组件，带有不同的选项和v-model -->
    <se-checkbox
      :options="checkboxOptions"
      v-model="selectedOptions"
      :disabled="true"
    >
      <p>已选择: {{ selectedOptions.length }} 个选项</p>
      <!-- 清除已选项按钮 -->
      <button @click="clearSelection">清除选项</button>
    </se-checkbox>

    <div class="selected-options">
      <h4>当前选中的选项:</h4>
      <ul>
        <li v-for="(option, index) in selectedOptions" :key="index">
          {{ option }}
        </li>
      </ul>
    </div>

    <h3>不同大小的复选框示例</h3>

    <div class="checkbox-sizes">
      <h4>小号复选框</h4>
      <se-checkbox
        :options="checkboxOptions"
        v-model="smallSelected"
        size="small"
      ></se-checkbox>

      <h4>中号复选框</h4>
      <se-checkbox
        :options="checkboxOptions"
        v-model="mediumSelected"
        size="middle"
      ></se-checkbox>

      <h4>大号复选框</h4>
      <se-checkbox
        :options="checkboxOptions"
        v-model="largeSelected"
        size="large"
      ></se-checkbox>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CheckboxDemo",

  setup() {
    // 存储不同复选框选项
    const checkboxOptions = ref([
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
    ]);

    // 存储选中的选项
    const selectedOptions = ref([]);
    const smallSelected = ref([]);
    const mediumSelected = ref([]);
    const largeSelected = ref([]);

    // 清除所有选中的选项
    const clearSelection = () => {
      selectedOptions.value = [];
    };

    return {
      checkboxOptions,
      selectedOptions,
      smallSelected,
      mediumSelected,
      largeSelected,
      clearSelection,
    };
  },
});
</script>

<style scoped>
.checkbox-demo {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h3 {
  color: #333;
}

.selected-options {
  margin-top: 20px;
}

.selected-options ul {
  list-style-type: none;
  padding: 0;
}

.selected-options li {
  padding: 5px 0;
}

.checkbox-sizes {
  margin-top: 30px;
}

.checkbox-sizes h4 {
  margin-top: 10px;
}

.se-checkbox {
  margin-top: 15px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
