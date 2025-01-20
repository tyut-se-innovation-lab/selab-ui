<template>
  <se-table :rows="rows" :rowHeight="60" :visibleCount="8"  :containerHeight="400" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  data() {
    return {
      rows: [
        { name: 'John', age: 30, occupation: 'Engineer' },
        { name: 'Jane', age: 28, occupation: 'Designer' },
        { name: 'Doe', age: 35, occupation: 'Manager' },
        { name: 'Alice', age: 25, occupation: 'Developer' },
        { name: 'Bob', age: 40, occupation: 'CEO' },
        { name: 'Charlie', age: 33, occupation: 'Analyst' },
        { name: 'John', age: 30, occupation: 'Engineer' },
        { name: 'Jane', age: 28, occupation: 'Designer' },
        { name: 'Doe', age: 35, occupation: 'Manager' },
        { name: 'Alice', age: 25, occupation: 'Developer' },
        { name: 'Bob', age: 40, occupation: 'CEO' },
        { name: 'Charlie', age: 33, occupation: 'Analyst' },
        // 更多数据...
      ],
    };
  },
});
</script>
