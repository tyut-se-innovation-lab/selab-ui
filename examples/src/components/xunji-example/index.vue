<script setup lang="ts">
import { ref, createVNode } from 'vue';
import { SeMsg, SeMiniMsg, SeCreateAlbum } from 'selab-ui';
import { ImgDownloadEvent } from 'selab-ui/src/img/src/image.d';
import useImg from './hooks/useImg.ts';

const { imgList } = useImg();

function msg(
    type: 'success' | 'warning' | 'danger' | 'info',
    message?: string
) {
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
                    msg('success', `xhr.onload > ${e.timeStamp}`);
                };
                xhr.onerror = function (e) {
                    console.log('xhr.onerror', e);
                    msg('danger', `xhr.onerror > ${e.timeStamp}`);
                };
                xhr.send();
            }
        },
        'createVNode测试'
    );
    // const msgA =
    SeMsg({
        message: message ? message : vNode,
        type,
        duration: message ? 3000 : Math.random() * 1000 + 1000,
        icon: type,
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
        message: `This is a ${type} message.`,
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
const onImgClose = (done: () => void) => {
    done();
    console.log('onImgClose');
};
const onImgOpen = (done: () => void) => {
    done();
    console.log('onImgOpen');
};
const onImgDownload = (e: ImgDownloadEvent) => {
    console.log('onImgDownload', e);
};

const albumLocation = {
    x: document.documentElement.clientWidth / 2 - 250,
    y: document.documentElement.clientHeight / 2 - 250,
    width: 500,
    height: 500
};

const visible1 = ref(false);

const closed1 = (value: false) => {
    visible1.value = value;
};

const visible2 = ref(false);

const closed2 = (value: false) => {
    visible2.value = value;
};

const myAlbum = SeCreateAlbum({
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
</script>

<template>
    <div>
        <se-button @click="msg('success')">Msg success</se-button>
        <se-button @click="msg('warning')">Msg warning</se-button>
        <se-button @click="msg('danger')">Msg danger</se-button>
        <se-button @click="msg('info')">Msg info</se-button>
        <se-button @click="$seMsg('info')">$seMsg</se-button>
        <se-button @click="miniMsg('info')">mini Msg</se-button>
        <se-button
            @click="
                $seMiniMsg({
                    message: 'This is a success message.',
                    type: 'success',
                    duration: 3000,
                    location: {
                        x: '50vw',
                        y: '30vh'
                    }
                })
            "
        >
            $seMiniMsg
        </se-button>
        <se-button
            @click="
                myAlbum.open(Math.floor(Math.random() * imgList.length) + 1)
            "
        >
            打开相册
        </se-button>
        <se-button @click="myAlbum.close()">关闭相册</se-button>
        <se-button @click="visible1 = true">dialog img 嵌套测试</se-button>
        <se-dialog
            title="温馨提示"
            v-model:visible="visible1"
            @close="closed1"
            closeable
        >
            <template #closeIcon>
                <div>123</div>
            </template>
            <se-button @click="visible2 = true">dialog img 嵌套测试</se-button>
            <se-dialog
                title="温馨提示"
                v-model:visible="visible2"
                @close="closed2"
                closeable
                ><se-img
                    v-for="i of [...Array(2).keys()]"
                    :key="i + 11"
                    :src="imgList[i + 11]"
                    fit="contain"
                    width="200"
                    height="200"
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
                </se-img></se-dialog
            >
            <se-img
                v-for="i of [...Array(2).keys()]"
                :key="i + 9"
                :src="imgList[i + 9]"
                fit="contain"
                width="200"
                height="200"
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
            <template v-slot:footer></template>
        </se-dialog>
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
            width="800"
            lazy
            :preview="{
                name: '测试1',
                isAlbum: true,
                albumList: imgList,
                animation: 'slide',
                loop: false,
                modal: true,
                onSwitch: onImgChange,
                onClose: onImgClose,
                onOpen: onImgOpen,
                toolbar: {
                    zoom: false,
                    rotate: false,
                    reset: false,
                    pagination: true,
                    flip: true,
                    show: true
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
    </div>
</template>
