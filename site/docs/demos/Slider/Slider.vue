<template>
  <div class="slider-demo">
    <h1>Slider 组件示例</h1>

    <section>
      <h2>基本使用</h2>
      <se-slider
        v-model:value="basicValue"
        :min="0"
        :max="100"
        :step="5"
        @change="onChange"
      />
      <p>当前值: {{ basicValue }}</p>
    </section>

    <section>
      <h2>自定义样式</h2>
      <se-slider
        v-model:value="customStyleValue"
        :min="0"
        :max="50"
        :step="2"
        type="primary"
        @input="onInput"
      />
      <p>当前值: {{ customStyleValue }}</p>
    </section>

    <section>
      <h2>禁用状态</h2>
      <se-slider
        v-model:value="disabledValue"
        :min="0"
        :max="10"
        :step="1"
        :disabled="true"
      />
      <p>禁用状态下的值: {{ disabledValue }}</p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SliderDemo",
  setup() {
    const basicValue = ref(50);
    const customStyleValue = ref(25);
    const disabledValue = ref(5);

    const onChange = (value: number) => {
      console.log("Slider 值变化完成:", value);
    };

    const onInput = (value: number) => {
      console.log("实时值更新:", value);
    };

    return {
      basicValue,
      customStyleValue,
      disabledValue,
      onChange,
      onInput,
    };
  },
});
</script>

<style scoped>
.slider-demo {
  padding: 20px;
}

.slider-demo section {
  margin-bottom: 30px;
}

.slider-demo h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.slider-demo p {
  margin-top: 5px;
  color: #555;
}
</style>
