<template>
  <se-cascader
      :options="options"
      type="primary"
      placeholder="请选择地区"
      @change="handleChange"
      @select="handleSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const options = ref([
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖' },
          { value: 'xiaoshan', label: '萧山' }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武' },
          { value: 'jiangning', label: '江宁' }
        ]
      }
    ]
  }
]);

const handleChange = (value: any, selectedOptions: any[]) => {
  console.log('选中的值:', value);
  console.log('选中的选项:', selectedOptions);
};

const handleSelect = (value: any, selectedOptions: any[]) => {
  console.log('用户选择了:', value);
  console.log('完整的选项:', selectedOptions);
};
</script>
