<template>
    <div>
        <se-button type="primary">测试</se-button>
        <se-box type="type1">测试盒子</se-box>
        <se-card type="type1">测试卡片</se-card>
        <se-tag>测试</se-tag>
        <se-tag type="success" closeable>测试</se-tag>
        <se-tag type="warning" v-for="item in 3" @click="tagclick">
            {{ item }}
        </se-tag>
        <se-tag type="danger" closeable>
            测试
            <template #closeIcon>
                <div>123</div>
            </template>
        </se-tag>
        <se-skeleton></se-skeleton>
        <se-skeleton :avatarShow="false" :active="true"></se-skeleton>
        <se-select :options="options" v-model="value"></se-select>

        <se-select :options="options" multiple v-model="value2"></se-select>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const options = [...Array(25)].map((_, i) => ({
    label: (i + 10).toString(36) + (i + 1),
    value: i
}));
const value = ref(3);
const value2 = ref([2, 5]);
const tagclick = (e: any) => {
    console.log(e);
};
</script>
