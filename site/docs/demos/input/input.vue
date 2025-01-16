<template>
  <div style="height: 200px">
  <SeInput
      :options="options"
      placeholder="选择选项..."
  />
  </div>
  <div style="height: 200px">
  <SeInput
      :options="options"
      placeholder="选择选项..."
      :multiple="true"
  />
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const options = Array.from({ length: 100 }, (_, i) => ({
      value: i,
      label: `选项 ${i + 1}`,
    }));

    return { options };
  },
});
</script>
