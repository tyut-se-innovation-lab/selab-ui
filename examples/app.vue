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
        <button @click="msg('success')">success</button>
        <button @click="msg('warning')">warning</button>
        <button @click="msg('danger')">danger</button>
        <button @click="msg('info')">info</button>
        <button @click="$SeMsg('info')">$SeMsg</button>
        <button @click="miniMsg('info')">mini Msg</button>
        <button @click="myAlbum.open(Math.floor(Math.random() * 211) + 1)">
            myAlbum open
        </button>
        <button @click="myAlbum.close()">myAlbum close</button>
        <se-img
            v-for="i of [...Array(9).keys()]"
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
                loop: true,
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
                closeIcon: 'close',
                closeOnClickModal: true,
                closeOnPressEscape: true,
                contextmenu: [
                    {
                        name: '测试1',
                        onClick: () => {
                            console.log('测试1');
                        },
                        children: [
                            {
                                name: '测试1.1',
                                onClick: () => {
                                    console.log('测试1.1');
                                },
                                icon: 'close'
                            }
                        ],
                        hidden: false
                    }
                ]
            }"
            :contextmenu="false"
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
                onSwitch: onImgChange,
                onClose: onImgClose,
                onOpen: onImgOpen,
                toolbar: {
                    zoom: false,
                    rotate: false,
                    reset: false,
                    pagination: true,
                    flip: true
                }
            }"
            :contextmenu="false"
            v-contextmenu="[
                {
                    name: '测试2',
                    onClick: () => {
                        console.log('测试2');
                    },
                    children: [
                        {
                            name: '测试2.1',
                            onClick: () => {
                                console.log('测试2.1');
                            },
                            icon: 'close'
                        }
                    ],
                    hidden: false
                }
            ]"
        >
            <!-- <template #loading>
                <div>loading</div>
            </template>
            <template #error>
                <div>error</div>
            </template> -->
            <template #mask>
                <span
                    v-contextmenu="[
                        {
                            name: '测试3',
                            onClick: () => {
                                console.log('测试3');
                            },
                            children: [
                                {
                                    name: '测试3.1',
                                    onClick: () => {
                                        console.log('测试3.1');
                                    },
                                    icon: 'close'
                                }
                            ],
                            hidden: false
                        }
                    ]"
                >
                    mask
                </span>
            </template>
        </se-img>

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
import { ref, createVNode } from 'vue';
import { SeMsg, SeMiniMsg, seCreateAlbum } from 'selab-ui';
import img1 from './src/assets/img/img (1).png';
import img2 from './src/assets/img/img (2).png';
import img3 from './src/assets/img/img (3).png';
import img4 from './src/assets/img/img (4).png';
import img5 from './src/assets/img/img (5).png';
import img6 from './src/assets/img/img (6).png';
import { visitFunctionBody } from 'typescript';
//dialog测试函数
const visible = ref(false);
const visible1 = ref(false);
const closed = (value: any) => {
    visible.value = value;
};
const closed1 = (value: any) => {
    visible1.value = value;
};
const imgList = [img1, img2, img3, img4, img5, img6];

for (let i = 1; i <= 211; i++) {
    imgList.push(`http://127.0.0.1:9000/img?index=${i}`);
}

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

function msg(type: 'success' | 'warning' | 'danger' | 'info') {
    const vNode = createVNode(
        'button',
        {
            key: 'buttonVNode',
            onClick: () => {
                console.log('createVNode测试');
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://127.0.0.1:9000/test', true);
                xhr.onload = function (e) {
                    console.log('xhr.onload', e);
                };
                xhr.send();
                msg('success');
            }
        },
        'createVNode测试'
    );
    // const msgA =
    SeMsg({
        message: vNode,
        type,
        duration: Math.random() * 1000 + 1000,
        icon: 'warning',
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
    SeMiniMsg({
        type: type,
        message: 'This is a success message',
        duration: 3000,
        location: {
            x: '50vw',
            y: '50vh'
        }
    });
}

const onImgChange = (
    done: () => void,
    index: number | false | 'isFirst' | 'isLast' | 'itIs'
) => {
    done();
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
    onSwitch: onImgChange,
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
