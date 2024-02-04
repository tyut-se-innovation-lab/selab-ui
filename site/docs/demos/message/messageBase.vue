<template>
    <button @click="msg('文本')">文本</button>
    <button
        @click="
            msg(
                createVNode(
                    'button',
                    {
                        class: 'buttonVNode',
                        style: {
                            'margin-right': '10px',
                            width: '100px',
                            height: '60px',
                            'background-color': '#6c9dff',
                            color: '#fff',
                            'font-size': '12px',
                            'border-radius': '5px',
                            border: 'none',
                            outline: 'none',
                            cursor: 'pointer'
                        },
                        ...event
                    },
                    'VNode'
                )
            )
        "
    >
        VNode
    </button>
</template>

<script setup lang="ts">
import { createVNode, VNode } from 'vue';
import { SeMsg } from 'selab-ui';
function msg(msg: string | VNode | (() => VNode)) {
    SeMsg(msg);
}
const event = {
    onmouseenter: () => {
        document.getElementsByClassName(
            'buttonVNode'
        )[0].style.backgroundColor = '#6c89ff';
    },
    onmouseleave: () => {
        document.getElementsByClassName(
            'buttonVNode'
        )[0].style.backgroundColor = '#6c9dff';
    },
    onclick: () => {
        console.log('VNode Button Click');
        SeMsg.closeAll();
    }
};
</script>

<style lang="less" scoped>
button,
.button {
    margin-right: 10px;
    width: 60px;
    height: 30px;
    background-color: #6c9dff;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: #6c89ff;
    }
}
</style>
