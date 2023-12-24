<template>
    <div class="se-select" @click="inputRef?.focus()">
        <div class="se-select-wrapper">
            <template v-if="selectProps.multiple">
                <div
                    class="se-select-selection-tags"
                    v-for="item in searchTags"
                >
                    <span>{{ item }}</span>
                    <span
                        class="se-select-selection-tag-close"
                        @click="removeTag(item)"
                        >x</span
                    >
                </div>
            </template>

            <span class="se-select-selection-search">
                <input
                    ref="inputRef"
                    class="se-select-search-input"
                    type="text"
                    @input="searchValueInput"
                    :value="searchValue"
                    @click="selectOptionsShow = true"
                />
            </span>
            <div
                class="se-select-selection-placeholder"
                v-show="
                    searchValue == '' &&
                    selectProps.placeholder &&
                    searchTags.length < 0
                "
            >
                {{ selectProps.placeholder }}
            </div>
        </div>
        <div
            class="se-select-dropdown"
            v-show="selectOptionsShow"
            v-click-outside="clickOutside"
        >
            <div
                class="se-select-dropdown-wrapper"
                :style="{ height: filterOptions.length * 32 + 'px' }"
            >
                <div
                    :class="[
                        'se-select-dropdown-item',
                        searchTags.includes(item.value)
                            ? 'se-select-dropdown-item-selected'
                            : ''
                    ]"
                    v-for="item in filterOptions"
                    @click="selectOptionsItemClick(item)"
                >
                    {{ item.value }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import '../../less/components/select/index.less';
import { computed, ref, withDefaults, watchEffect, watch } from 'vue';
defineOptions({ name: 'se-select' });

type ISelectProps = {
    placeholder?: string;
    options: any[];
    multiple?: boolean;
    autoClearSearchValue?: boolean;
};

const selectProps = withDefaults(defineProps<ISelectProps>(), {
    placeholder: '请输入内容',
    multiple: false,
    autoClearSearchValue: true
});
const searchValue = ref('');

const filterOptions = computed(() => {
    if (!selectProps.multiple) return selectProps.options;
    return searchValue.value
        ? selectProps.options.filter((item) =>
              item.value.includes(searchValue.value)
          )
        : selectProps.options;
});
const selectOptionsShow = ref(false);
const searchTags = ref<any[]>(['a1', 'b3']);

const searchValueInput = (e: Event) => {
    searchValue.value = (e.target as HTMLInputElement).value;
    selectOptionsShow.value = searchValue.value.length > 0;
};
const clickOutside = () => {
    selectOptionsShow.value = false;
};
const selectOptionsItemClick = (item: any) => {
    if (!selectProps.multiple) {
        //单选
        selectOptionsShow.value = false;
        searchValue.value = item.value;
        return;
    }
    //多选
    selectProps.autoClearSearchValue && (searchValue.value = '');
    const index = searchTags.value.indexOf(item.value);
    if (index > -1) {
        searchTags.value.splice(index, 1);
    } else {
        searchTags.value.push(item.value);
    }
};
const removeTag = (item: any) => {
    searchTags.value = searchTags.value.filter((i) => i !== item);
};
watchEffect(() => {});
// watch(
//     () => searchValue.value,
//     () => {
//         if (selectProps.multiple) {
//             selectOptionsShow.value = searchValue.value.length > 0;
//         } else {
//             selectOptionsShow.value = true;
//         }
//     }
// );

const selectDropSize = ref(6);
const inputRef = ref<HTMLInputElement>();
</script>
