<script setup lang="ts">
import { createVNode } from 'vue';
import { SeMsg, SeMiniMsg, seCreateAlbum } from 'selab-ui';
import { ImgDownloadEvent } from 'selab-ui/src/img/src/image.d';
import useImg from './hooks/useImg.ts';

const { imgList } = useImg();

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
</script>

<template>
    <div>
        <button @click="msg('success')">success</button>
        <button @click="msg('warning')">warning</button>
        <button @click="msg('danger')">danger</button>
        <button @click="msg('info')">info</button>
        <button @click="$SeMsg('info')">$SeMsg</button>
        <button @click="miniMsg('info')">mini Msg</button>
        <button
            @click="
                $SeMiniMsg({
                    message: 'This is a success message',
                    type: 'success',
                    duration: 3000,
                    location: {
                        x: '50vw',
                        y: '30vh'
                    }
                })
            "
        >
            $SeMiniMsg
        </button>
        <button
            @click="
                myAlbum.open(Math.floor(Math.random() * imgList.length) + 1)
            "
        >
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
