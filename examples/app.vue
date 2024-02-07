<template>
    <div>
        <se-tooltip>
            <template #title>默认触发颜色</template>
            触发文本触发文本触发文本触发文本触发文本触发文本
        </se-tooltip>
        <se-tooltip color="pink" :mouseLeaveDelay="1">
            <template #title>自定义触发颜色:pink</template>
            触发文本触发文本触发文本触发文本触
        </se-tooltip>
        <se-tooltip color="#f50" trigger="click">
            <template #title>自定义触发颜色:#f50</template>
            触发文本触发文本触发文本
        </se-tooltip>
        <se-rate />
        <se-button type="primary">测试</se-button>
        <se-box type="type1">测试盒子</se-box>
        <se-card type="type1">测试卡片</se-card>
        <se-tag>测试</se-tag>
        <se-tag type="success" closeable>测试</se-tag>
        <se-tag type="warning" v-for="item in 3" :key="item" @click="tagclick">
            {{ item }}
        </se-tag>

        <se-tag type="danger" closeable>
            测试
            <template #closeIcon>
                <div>123</div>
            </template>
        </se-tag>
        <se-button @click="visible = true">dialog测试</se-button>
        <se-dialog
            title="温馨提示"
            v-model:visible="visible"
            @close="closed"
            closeable
        >
            <template #closeIcon>
                <div>123</div>
            </template>
            <template v-slot:footer> </template>
        </se-dialog>
        <se-button @click="visible1 = true">dialog测试</se-button>
        <se-dialog v-model:visible="visible1" @close="closed1" closeable>
            <template v-slot:title>
                <h1>我是标题</h1>
            </template>
            <template v-slot:footer>
                <se-button
                    type="danger"
                    @click="visible1 = false"
                    style="margin-right: 30px"
                    >取消</se-button
                >
                <se-button type="success" @click="visible1 = false"
                    >确定</se-button
                >
            </template>
        </se-dialog>
        <se-skeleton></se-skeleton>
        <se-skeleton :avatarShow="false" :active="true"></se-skeleton>
        <!--        <se-skeleton></se-skeleton>-->
        <!--        <se-skeleton :avatarShow="false" :active="true"></se-skeleton>-->
        <se-select :options="options" v-model="value"></se-select>
        <se-select :options="options" multiple v-model="value2"></se-select>
        <se-select
            :options="options"
            filterable
            :filter-method="filter"
            multiple
            v-model="value2"
        ></se-select>

        <se-select
            :options="options3"
            multiple
            remote
            v-model="value3"
            :queryMethod="query"
        ></se-select>
        <xun-ji-example />
        <se-switch v-model="value4" switchDisabled></se-switch>
        <se-switch
            v-model="value5"
            inactiveText="测试1"
            activeText="测试2"
        ></se-switch>
        <se-progress></se-progress>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import XunJiExample from './src/components/xunji-example/index.vue';
//dialog测试函数
const visible = ref(false);
const visible1 = ref(false);
const closed = (value: any) => {
    visible.value = value;
};
const closed1 = (value: any) => {
    visible1.value = value;
};

const options = ref(
    [...Array(25)].map((_, i) => ({
        label: (i + 10).toString(36) + (i + 1),
        value: i
    }))
);
const options2 = ref([]);
const value = ref(3);
const value2 = ref([2, 5]);

const value5 = ref(true);
const value4 = ref(true);
const tagclick = (e: any) => {
    console.log(e);
};

const filter = (value: string) => {
    console.log(value);
    return options.value.filter((i) => i.label.includes(value));
};

const value3 = ref([]);
const loading = ref(false);
const options3 = ref<{ value: string | number; label: string }[]>();
const query = (value: string) => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        options3.value = [...Array(25)].map((_, i) => ({
            label: (i + 10).toString(36) + (i + 1),
            value: i
        }));
    }, 2000);
};
</script>
