<template>
  <div>
    <!-- Hover 触发的 Tooltip -->
    <se-tooltip style="margin: 10px" trigger="hover" color="#3498db" >
      <template #default>
        <se-button>Hover 显示 Tooltip</se-button>
      </template>
      <template #title>
        <p>这是一个 Hover 显示的 Tooltip 内容。</p>
      </template>
    </se-tooltip>

    <!-- Click 触发的 Tooltip -->
    <se-tooltip style="margin: 10px" trigger="click" color="orange">
      <template #default>
        <se-button>Click 显示 Tooltip</se-button>
      </template>
      <template #title>
        <p>这是一个 Click 显示的 Tooltip 内容。</p>
      </template>
    </se-tooltip>


  </div>
</template>

<script lang="ts" setup>
</script>
