<template>
  <div class="app">
    <seDropdown
      :trigger="'click'"
      :type="'default'"
      :placement="'bottomLeft'"
      :disabled="false"
      :menuItems="menuItems"
      @onSelect="handleSelect"
  >
    <template #trigger>
      <span>click触发下拉</span>
    </template>
  </seDropdown>
    <seDropdown
        style="margin-left: 40px"
        :trigger="'hover'"
        :type="'default'"
        :placement="'bottomLeft'"
        :disabled="false"
        :menuItems="menuItems"
        @onSelect="handleSelect"
    >
      <template #trigger>
        <span><se-icon icon="mingcute:down-fill" color="#666"/> hover触发下拉</span>
      </template>
    </seDropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",

  setup() {
    const menuItems = ref([
      { label: '选项1', icon: 'mdi:home' },
      { label: '选项2', icon: 'mdi:account' },
      { label: '选项3', icon: 'mdi:settings' }
    ])

    const handleSelect = (selectedItem: string) => {
      console.log('选中了：', selectedItem); // 输出选中的菜单项内容
    };

    return {
      menuItems,
      handleSelect,
    };
  },
});
</script>
