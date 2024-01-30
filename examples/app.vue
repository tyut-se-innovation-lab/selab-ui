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
        <se-skeleton></se-skeleton>
        <se-skeleton :avatarShow="false" :active="true"></se-skeleton>
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
        <button @click="msg('success')">success</button>
        <button @click="msg('warning')">warning</button>
        <button @click="msg('danger')">danger</button>
        <button @click="msg('info')">info</button>
        <button @click="$seMsg('info')">$seMsg</button>
        <button @click="miniMsg('info')">mini Msg</button>
        <button @click="myAlbum.open(2)">myAlbum open</button>
        <button @click="myAlbum.close()">myAlbum close</button>
        <se-img
            v-for="i of [...Array(6).keys()]"
            :key="i"
            :src="imgList[i]"
            fit="contain"
            width="400"
            lazy
            :preview="{
                name: '测试',
                minScale: 1,
                maxScale: 50,
                animation: 'fade',
                loop: false,
                toolbar: {
                    show: true,
                    zoom: true,
                    rotate: true,
                    reset: true,
                    pagination: true,
                    flip: true,
                    download: onImgDownload
                },
                modal: true,
                scaleStep: 0.5,
                closeIcon: '滚',
                closeOnClickModal: true,
                closeOnPressEscape: true
            }"
        >
            <template #loading>
                <div>loading</div>
            </template>
            <template #error>
                <div>error</div>
            </template>
            <template #mask>
                <span> mask </span>
            </template>
        </se-img>
        <se-img
            :src="imgList[3]"
            fit="cover"
            width="400"
            lazy
            :preview="{
                name: '测试1',
                album: true,
                albumList: imgList,
                animation: 'slide',
                loop: false,
                modal: false,
                onChange: onImgChange,
                onClose: onImgClose,
                onOpen: onImgOpen,
                toolbar: {
                    show: false
                }
            }"
            :contextmenu="false"
        >
            <!-- <template #loading>
                <div>loading</div>
            </template>
            <template #error>
                <div>error</div>
            </template>
            <template #mask>
                <span> mask </span>
            </template> -->
        </se-img>
    </div>
</template>
<script lang="ts" setup>
import { ref, createVNode } from 'vue';
import { seMsg, seMiniMsg, seCreateAlbum } from 'selab-ui';
import img1 from './src/assets/img/img (1).png';
import img2 from './src/assets/img/img (2).png';
import img3 from './src/assets/img/img (3).png';
import img4 from './src/assets/img/img (4).png';
import img5 from './src/assets/img/img (5).png';
import img6 from './src/assets/img/img (6).png';

const imgList = [img1, img2, img3, img4, img5, img6];

const options = ref(
    [...Array(25)].map((_, i) => ({
        label: (i + 10).toString(36) + (i + 1),
        value: i
    }))
);
const options2 = ref([]);
const value = ref(3);
const value2 = ref([2, 5]);
const tagclick = (e: any) => {
    console.log(e);
};

function msg(type: 'success' | 'warning' | 'danger' | 'info') {
    const vNode = createVNode(
        'button',
        {
            key: 'buttonVNode',
            onClick: () => console.log('createVNode测试')
        },
        'createVNode测试'
    );
    // const msgA =
    seMsg({
        message: vNode,
        type,
        duration: Math.random() * 1000 + 1000,
        icon: 'info',
        showClose: true,
        size: 'default',
        beforeClose: (close) => {
            setTimeout(() => {
                close();
            }, 0);
        },
        onCloseClick: () => {
            console.log('onCloseClick');
        }
    });
    // setTimeout(() => {
    //     msgA.close();
    // }, 2000);
}

function miniMsg(type: 'success' | 'warning' | 'danger' | 'info') {
    seMiniMsg({
        type: type,
        message: 'This is a success message',
        duration: 3000,
        location: {
            x: '50vw',
            y: '50vh'
        }
    });
}

const onImgChange = (change: () => void, index: number | false) => {
    change();
    console.log('onImgChange', index);
};
const onImgClose = (close: () => void) => {
    close();
    console.log('onImgClose');
};
const onImgOpen = (open: () => void) => {
    open();
    console.log('onImgOpen');
};
const onImgDownload = (e: any) => {
    console.log('onImgDownload', e);
};
const filter = (value: string) => {
    console.log(value);
    return options.value.filter((i) => i.label.includes(value));
};

const albumLocation = {
    x: document.documentElement.clientWidth / 2 - 250,
    y: document.documentElement.clientHeight / 2 - 250,
    width: 500,
    height: 500
};

const myAlbum = seCreateAlbum({
    albumList: imgList,
    animation: 'none',
    loop: true,
    modal: false,
    location: albumLocation,
    onChange: onImgChange,
    onClose: onImgClose,
    onOpen: onImgOpen,
    toolbar: {
        show: true
    }
});

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