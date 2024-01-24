<template>
    <span class="se-tag" :class="tagStyle" @click="tagClick">
        <slot />
        <span class="se-tag-close-icon" v-if="closeable" @click="tagCloseClick">
            <template v-if="slots.closeIcon">
                <slot name="closeIcon"></slot>
            </template>
            <template v-else> x </template>
        </span>
    </span>
</template>

<script lang="ts" setup>
import '../../less/components/tag/index.less';
import { computed, ref, withDefaults, useSlots } from 'vue';

defineOptions({ name: 'se-tag' });
type tagType = 'success' | 'info' | 'warning' | 'danger';
const show = ref(true);
const slots = useSlots();
type Props = {
    type?: tagType;
    closeable?: boolean;
};
const emits = defineEmits(['close', 'click']);
const tagProps = withDefaults(defineProps<Props>(), {
    closeable: false
});
const tagClick = () => {
    emits('click');
};
const tagCloseClick = () => {
    if (tagProps.closeable) {
        show.value = false;
        emits('close');
    }
};

const tagStyle = computed(() => [
    tagProps.type ? `se-tag--${tagProps.type}` : '',
    show.value ? '' : 'se-tag--hide'
]);
</script>
