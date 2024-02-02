<template>
  <div class="se-switch-external">
<!--    按钮前面的字-->
    <span
        class="se-switch-frontText"
        :class="[{'activeText':!modelValue},{'showText':inactiveText === ''}]">
      {{props.inactiveText}}
    </span>
    <div class="se-switch"
         :class="switchStyle">
      <label class="switch"
             :class="['se-switch',`se-switch--${type}`,{'se-switch--large':size === 'large'}]"
      >
        <slot/>
        <input type="checkbox"
               :disabled="props.switchDisabled"
               :checked="checkedResult"
               :true-value="activeValue"
               :false-value="inactiveValue"
               @change="handleChange"
               value="{{props.modelValue}}"

        >
        <div
            class="round"
            :class="['slider',{'se-slider':isLarge},{'se-slider--large':size === 'large'},{'se-slider-forbidden':switchDisabled}]"
        ></div>

      </label>
    </div>
<!--    按钮后面的字-->
    <span
        class="se-switch-followText"
        :class="[{'activeText':modelValue},{'showText':activeText === ''}]"
    >{{props.activeText}}</span>
  </div>
</template>

<script lang="ts" setup>
import '../../less/components/switch/index.less'
import {computed, ref, PropType, nextTick, watch, defineComponent} from "vue";
import {switchProps, switchEmits} from "./switch.ts"
import {input} from "sucrase/dist/types/parser/traverser/base";
const emit = defineEmits(switchEmits)
const props = defineProps(switchProps)
const isLarge = computed(() => {
  return props.size != 'large';
})
let ColorChange = ref(true)

defineOptions({name: "se-switch"});

const switchStyle = computed(() => {
  return {["se-switch--" + switchProps.type]: switchProps.type};
});

// 这里是点击事件之后的东西
const checkedResult = computed(() => {
      return props.modelValue === props.activeValue
      // return false
    }
)


//规定了该按钮是否禁用
// let switchDisabled = ref(false)
// function changeSwitch(){
//   console.log("发生了改变")
//   console.log("!!",switchDisabled.value)
//   !(switchDisabled.value) && handleChange()
// }
function handleChange(e: Event) {
  console.log("modelValue", props.modelValue)

  //这里写具体的传的值,在此之前，我还需要知道
  const val = checkedResult.value ? props.activeValue : props.inactiveValue
  console.log("这是什么东西" + val)
  // emit('change',val)
  emit('update:modelValue', !props.modelValue)
  console.log("modelValue2", props.modelValue)
  emit('change', val, e)


}

const currentValue = ref(props.modelValue)
watch(
    () => props.modelValue,
    (value) => {
      console.log("switchDisabled",props.switchDisabled)
      currentValue.value = value
    },

)



</script>