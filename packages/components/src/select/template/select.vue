<template>
<<<<<<< HEAD
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
=======
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

      <div class="se-select-selection-search">
        <input
            ref="inputRef"
            class="se-select-search-input"
            type="text"
            @input="searchValueInput"
            :value="searchValue"
            @click="selectOptionsShow = true"
        />
      </div>
      <div
          class="se-select-selection-placeholder"
          v-show="
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
                    searchValue == '' &&
                    selectProps.placeholder &&
                    searchTags.length < 0
                "
<<<<<<< HEAD
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
=======
      >
        {{ selectProps.placeholder }}
      </div>
    </div>
    <div
        class="se-select-dropdown"
        v-show="selectOptionsShow"
    >
      <div
          class="se-select-dropdown-wrapper"
          :style="{ height: filterOptions.length * 32 + 'px' }"
      >
        <div
            :class="[
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
                        'se-select-dropdown-item',
                        searchTags.includes(item.value)
                            ? 'se-select-dropdown-item-selected'
                            : ''
                    ]"
<<<<<<< HEAD
                    v-for="item in filterOptions"
                    @click="selectOptionsItemClick(item)"
                >
                    {{ item.value }}
                </div>
            </div>
        </div>
    </div>
=======
            v-for="item in filterOptions"
            @click="selectOptionsItemClick(item)"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
</template>

<script lang="ts" setup>
import '../../less/components/select/index.less';
import { computed, ref, withDefaults, watchEffect, watch } from 'vue';
defineOptions({ name: 'se-select' });

type ISelectProps = {
<<<<<<< HEAD
    placeholder?: string;
    options: any[];
    multiple?: boolean;
    autoClearSearchValue?: boolean;
};

const selectProps = withDefaults(defineProps<ISelectProps>(), {
    placeholder: '请输入内容',
    multiple: false,
    autoClearSearchValue: true
=======
  placeholder?: string;
  options: any[];
  multiple?: boolean;
  autoClearSearchValue?: boolean;
};

const selectProps = withDefaults(defineProps<ISelectProps>(), {
  placeholder: '请输入内容',
  multiple: false,
  autoClearSearchValue: true
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
});
const searchValue = ref('');

const filterOptions = computed(() => {
<<<<<<< HEAD
    if (!selectProps.multiple) return selectProps.options;
    return searchValue.value
        ? selectProps.options.filter((item) =>
              item.value.includes(searchValue.value)
          )
        : selectProps.options;
=======
  if (!selectProps.multiple) return selectProps.options;
  return searchValue.value
      ? selectProps.options.filter((item) =>
          item.value.includes(searchValue.value)
      )
      : selectProps.options;
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
});
const selectOptionsShow = ref(false);
const searchTags = ref<any[]>(['a1', 'b3']);

const searchValueInput = (e: Event) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
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
