<template>
  <div class="app">
    <h1>Vue 日期选择器</h1>
    <SeDatePicker
        type="time"
        v-model="selectedDate"
        placeholder="选择日期"
        @clear="handleClear"
        @change="handleDateChange"
    />
    <div v-if="selectedDate">
      <p>选中的日期是：{{ selectedDate }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import SeDatePicker from './components/SeDatePicker'; // 假设SeDatePicker在components目录下

export default defineComponent({
  name: 'App',
  components: {
    // SeDatePicker,
  },
  setup() {
    const selectedDate = ref('');

    // 处理日期变化
    const handleDateChange = (newDate: string) => {
      console.log('日期已选择:', newDate);
      selectedDate.value = newDate;
    };

    // 处理日期清空
    const handleClear = () => {
      console.log('日期已清空');
      selectedDate.value = '';
    };

    return {
      selectedDate,
      handleDateChange,
      handleClear,
    };
  },
});
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.se-datePicker-input {
  width: 200px;
  padding: 8px;
  font-size: 16px;
}
</style>
