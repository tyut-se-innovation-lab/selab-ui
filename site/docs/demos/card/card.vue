<template>
  <div class="card-demo">
    <!-- 测试案例 1: 基本卡片 -->
    <h3>测试案例 1: 默认卡片</h3>
    <se-card title="默认卡片">
      这是一个默认类型的卡片，没有其他特殊样式。
    </se-card>

    <!-- 测试案例 2: 卡片类型-->
    <h3>测试案例 2: 不同类型的卡片</h3>
    <se-card type="primary" title="主色卡片">
      这是一个主色的卡片，背景色不同。
    </se-card>
    <se-card type="secondary" title="副色卡片">
      这是一个副色的卡片，背景色不同。
    </se-card>
    <se-card type="success" title="成功状态卡片">
      这是一个成功状态的卡片，带有绿色背景。
    </se-card>
    <se-card type="warning" title="警告状态卡片">
      这是一个警告状态的卡片，带有黄色背景。
    </se-card>
    <se-card type="danger" title="危险状态卡片">
      这是一个危险状态的卡片，带有红色背景。
    </se-card>

    <!-- 测试案例 3: 带图标的卡片 -->
    <h3>测试案例 3: 带图标的卡片</h3>
    <se-card type="primary" icon="⭐" title="带图标的卡片">
      这是一个带图标的卡片，图标是一个星星。
    </se-card>

    <!-- 测试案例 4: 可悬停的卡片 -->
    <h3>测试案例 4: 可悬停的卡片</h3>
    <se-card hoverable title="悬停效果卡片">
      这是一个启用了悬停效果的卡片，当你悬停时，它会有阴影效果。
    </se-card>

    <!-- 测试案例 5: 带边框的卡片 -->
    <h3>测试案例 5: 带边框的卡片</h3>
    <se-card bordered title="带边框的卡片">
      这是一个带有边框的卡片，默认是带边框的。
    </se-card>

    <!-- 测试案例 6: 不带边框的卡片 -->
    <h3>测试案例 6: 不带边框的卡片</h3>
    <se-card :bordered="false" title="不带边框的卡片">
      这是一个不带边框的卡片，边框是可配置的。
    </se-card>

    <!-- 测试案例 7: 带有卡片内容和底部 -->
    <h3>测试案例 7: 带底部的卡片</h3>
    <se-card title="卡片带底部">
      <template #footer>
        <button>查看更多</button>
      </template>
      这是一个有底部按钮的卡片，底部内容由 `footer` 插槽提供。
    </se-card>
  </div>
</template>

<style scoped>
.card-demo {
  padding: 20px;
}

h3 {
  margin-top: 30px;
  font-size: 18px;
  color: #333;
}
</style>
