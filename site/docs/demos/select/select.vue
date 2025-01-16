<template>
  <div>
    <h2>单选示例</h2>
    <se-select
        v-model:modelValue="singleSelectValue"
        :options="options"
        placeholder="请选择一个选项"
    />
    <p>当前选择: {{ singleSelectValue }}</p>

    <h2>多选示例</h2>
    <se-select
        v-model:modelValue="multiSelectValue"
        :options="options"
        placeholder="请选择多个选项"
        multiple
    />
    <p>当前选择: {{ multiSelectValue }}</p>
  </div>
  <div>
    <h2>搜索示例</h2>
    <se-select
        v-model:modelValue="selectedValue"
        :options="filteredOptions"
        placeholder="请输入关键字搜索"
        :filterable="true"
        :filterMethod="customFilter"
    />
    <p>当前选择: {{ selectedValue }}</p>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

// 初始化选项数据
const options = Array.from({ length: 20 }, (_, i) => ({
  value: i + 1,
  label: `选项 ${i + 1}`,
}));

// 被选中的值
const selectedValue = ref<number | null>(null);

// 当前过滤后的选项
const filteredOptions = ref([...options]);

// 自定义过滤方法
const customFilter = (query: string) => {
 return  filteredOptions.value = options.filter((option) =>
      option.label.includes(query)
  );
};


const singleSelectValue = ref<number | string | null>(null);
const multiSelectValue = ref<number[] | string[]>([] );
</script>

<style scoped>
h2 {
  margin-top: 20px;
}
p {
  margin-top: 10px;
  color: #555;
}
</style>
