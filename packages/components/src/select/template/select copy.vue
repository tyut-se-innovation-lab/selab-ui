<template>
    <div
        :class="['se-select', selectOptionsShow ? 'se-select-selected' : '']"
        @click="selectClick"
        v-click-outside="clickOutside"
    >
        <div
            class="se-select-wrapper"
            :style="{
                '--margin-left': selectMultipleValue.length > 0 ? '0px' : '10px'
            }"
        >
            <template v-if="selectProps.multiple">
                <div
                    class="se-select-selection-tags"
                    v-for="item in selectMultipleTarget"
                >
                    <span>{{ item.label }}</span>
                    <span
                        class="se-select-selection-tag-close"
                        @click.stop="removeTag(item)"
                        >x</span
                    >
                </div>
                <div class="se-select-selection-search">
                    <input
                        ref="inputRef"
                        class="se-select-search-input"
                        type="text"
                        @input="searchValueInput"
                        :value="searchValue"
                    />
                </div>
            </template>
            <div class="se-select-selection-item">
                {{ labelProxy }}
            </div>
            <div
                class="se-select-selection-placeholder"
                v-show="
                    searchValue == '' &&
                    selectProps.placeholder &&
                    selectMultipleValue.length < 0
                "
            >
                {{ selectProps.placeholder }}
            </div>
        </div>
        <div class="se-select-dropdown" v-show="selectOptionsShow">
            <div
                class="se-select-dropdown-wrapper"
                :style="{ height: filterOptions.length * 32 + 'px' }"
            >
                <div
                    :class="[
                        'se-select-dropdown-item',
                        selectOptionItemClass(item)
                    ]"
                    v-for="item in filterOptions"
                    @click.stop="selectOptionsItemClick(item)"
                >
                    {{ item.label }}
                </div>
            </div>
            <div class="empty-data" v-if="filterOptions.length == 0">
                暂无数据
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import '../../less/components/select/index.less';
import { computed, ref, withDefaults } from 'vue';
defineOptions({ name: 'se-select' });

type ISelectProps = {
    placeholder?: string;
    options: ISelectOption[];
    multiple?: boolean;
    autoClearSearchValue?: boolean;
    modelValue: string | number | string[] | number[];
    filterable?: boolean;
    filterMethod?: (value: string) => void;
    queryMethod?: (value: string) => void;
};
type ISelectOption = {
    value: string | number;
    label: string;
};

const selectProps = withDefaults(defineProps<ISelectProps>(), {
    placeholder: '请输入内容',
    multiple: false,
    autoClearSearchValue: true,
    options: () => []
});
const emits = defineEmits(['update:modelValue']);
const searchValue = ref('');
//单选值
const valueProxy = computed({
    get() {
        return selectProps.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    }
});
const labelProxy = computed(() => {
    return selectProps.options.find((i) => i.value === valueProxy.value)?.label;
});

//计算选中的item的class
const selectOptionItemClass = (item: ISelectOption) => {
    if (
        (selectMultipleValue.value.length > 0 &&
            selectMultipleValue.value.findIndex((i) => i === item.value) >
                -1) ||
        item.value === valueProxy.value
    )
        return 'se-select-dropdown-item-selected';
};

const filterOptions = computed(() => {
    if (!selectProps.multiple) return selectProps.options;
    if (searchValue.value) {
        //如何有自定义筛选
        if (selectProps.filterable && selectProps.filterMethod) {
            selectProps.filterMethod(searchValue.value);
        }
        return selectProps.options.filter((item) =>
            item.label.includes(searchValue.value)
        );
    }
    return selectProps.options;
});
//下拉框
const selectOptionsShow = ref(false);

const searchValueInput = (e: Event) => {
    searchValue.value = (e.target as HTMLInputElement).value;
    selectOptionsShow.value = searchValue.value.length > 0;
};
const selectClick = () => {
    inputRef.value?.focus();
    selectOptionsShow.value = !selectOptionsShow.value;
};
const clickOutside = () => {
    selectOptionsShow.value = false;
};
//多选tag值
const selectMultipleValue = computed({
    get() {
        if (selectProps.multiple && selectProps.modelValue instanceof Array) {
            return selectProps.modelValue || [];
        }
        return [];
    },
    set(value) {
        emits('update:modelValue', value);
    }
});
const selectMultipleTarget = computed(() => {
    if (selectProps.options.length > 0)
        return selectProps.options.filter(
            (i) =>
                selectMultipleValue.value.findIndex((j) => j === i.value) > -1
        );
});
const selectOptionsItemClick = (item: ISelectOption) => {
    if (!selectProps.multiple) {
        //单选
        searchValue.value = item.label;
        valueProxy.value = item.value;
        selectOptionsShow.value = false;
        return;
    }
    //多选
    selectProps.autoClearSearchValue && (searchValue.value = '');
    const index = selectMultipleValue.value.findIndex((i) => i === item.value);
    if (index > -1) {
        selectMultipleValue.value.splice(index, 1);
    } else {
        console.log(item.value);
        const arr = [...selectMultipleValue.value];
        arr.push(item.value);
        selectMultipleValue.value = arr as any;
        console.log(selectMultipleValue.value);
    }
};
const removeTag = (item: ISelectOption) => {
    selectMultipleValue.value = selectMultipleValue.value.filter(
        (i) => i !== item.value
    ) as any;
};

const selectDropSize = ref(6);
const inputRef = ref<HTMLInputElement>();
</script>
