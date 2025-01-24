<script setup lang="ts">
import { ref, createVNode } from "vue";
import { SeMsg, SeMiniMsg, SeCreateAlbum } from "selab-ui";
import useImg from "./hooks/useImg.ts";

const edgeProgressTest = ref(15);

const edgeProgressOptions = {
  color: "#0066ff",
  strokeWidth: "3px",
  position: "top",
};

const edgeProgressChange = (e: WheelEvent) => {
  if (edgeProgressTest.value < 0) {
    edgeProgressTest.value = 0;
  } else if (edgeProgressTest.value > 100) {
    edgeProgressTest.value = 100;
  }
  edgeProgressTest.value -= e.deltaY / 10;
};

const banDocumentWheel = () => (document.body.style.overflow = "hidden");

const allowDocumentWheel = () => (document.body.style.overflow = "auto");

const edgeProgressOptionsChange = () => {
  console.log("edgeProgressOptionsChange");
  edgeProgressOptions.color = `#${Math.floor(Math.random() * 16777215).toString(
    16,
  )}`;
  edgeProgressOptions.strokeWidth = `${Math.floor(Math.random() * 10 + 1)}px`;
  edgeProgressOptions.position = Math.random() > 0.5 ? "top" : "bottom";
  edgeProgressTest.value -= 0.1;
  setTimeout(() => {
    edgeProgressTest.value += 0.1;
  });
};

const imgPreview1 = ref();

const imgPreviewIndex = ref(0);

const options = [
  { label: "img1", value: 0 },
  { label: "img2", value: 1 },
  { label: "img3", value: 2 },
  { label: "img4", value: 3 },
  { label: "img5", value: 4 },
  { label: "img6", value: 5 },
  { label: "img7", value: 6 },
  { label: "img8", value: 7 },
  { label: "img9", value: 8 },
];

const openPreview = (index: number) => {
  console.log("openPreview", index);
  imgPreview1.value[index].openPreview();
};

const closePreview = (index: number) => {
  imgPreview1.value[index].closePreview();
};

const imgPreview2 = ref();

const { imgList } = useImg();

function msg(
  type: "success" | "warning" | "danger" | "info",
  message?: string,
) {
  const vNode = createVNode(
    "button",
    {
      key: "buttonVNode",
      onClick: () => {
        console.log("createVNode测试");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:9000/test", true);
        xhr.onload = function (e) {
          console.log("xhr.onload", e);
          msg("success", `xhr.onload > ${e.timeStamp}`);
          msg("info", `端口9000返回内容 > ${xhr.responseText}`);
        };
        xhr.onerror = function (e) {
          console.log("xhr.onerror", e);
          msg("danger", `xhr.onerror > ${e.timeStamp}`);
        };
        xhr.send();
      },
    },
    "createVNode测试",
  );
  // const msgA =
  SeMsg({
    message: message ? message : vNode,
    type,
    duration: message ? 3000 : Math.random() * 1000 + 1000,
    icon: type,
    showClose: true,
    size: "default",
    beforeClose: (close) => {
      setTimeout(() => {
        close();
      }, 0);
    },
    onCloseClick: () => {
      console.log("onCloseClick");
    },
  });
  // setTimeout(() => {
  //     msgA.close();
  // }, 2000);
}

function miniMsg(type: "success" | "warning" | "danger" | "info") {
  SeMiniMsg({
    type: type,
    message: `This is a ${type} message.`,
    duration: 3000,
    location: {
      x: "50vw",
      y: "50vh",
    },
  });
}

const onImgChange = (
  done: () => void,
  index: number | false | "isFirst" | "isLast" | "itIs",
) => {
  done();
  console.log("onImgChange", index);
};
const onImgClose = (done: () => void) => {
  done();
  console.log("onImgClose");
};
const onImgOpen = (done: () => void) => {
  done();
  console.log("onImgOpen");
};

const albumLocation = {
  x: document.documentElement.clientWidth / 2 - 250,
  y: document.documentElement.clientHeight / 2 - 250,
  width: 500,
  height: 500,
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
  animation: "none",
  loop: true,
  modal: false,
  location: albumLocation,
  onSwitch: onImgChange,
  onClose: onImgClose,
  onOpen: onImgOpen,
  toolbar: {
    show: true,
  },
});
</script>

<template>
  <div>
    <div
      v-edge-progress:[edgeProgressOptions]="edgeProgressTest"
      class="edge-progress"
      @wheel="edgeProgressChange"
      @click="edgeProgressOptionsChange"
      @mouseenter="banDocumentWheel"
      @mouseleave="allowDocumentWheel"
    >
      在此处滚动鼠标滚轮调整进度条长度, 点击此处改变进度条颜色、高度和位置
    </div>
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
            y: '30vh',
          },
        })
      "
    >
      $seMiniMsg
    </se-button>
    <se-button
      @click="myAlbum.open(Math.floor(Math.random() * imgList.length))"
    >
      打开无外部展示相册
    </se-button>
    <se-button @click="myAlbum.close()">关闭无外部展示相册</se-button>
    <se-button @click="visible1 = true">dialog img 嵌套测试</se-button>
    <se-dialog
      title="温馨提示"
      v-model:visible="visible1"
      width="90vw"
      @close="closed1"
      closeable
    >
      <template #closeIcon>
        <div>123</div>
      </template>
      <se-button @click="visible2 = true">dialog img 二级嵌套测试</se-button>
      <se-button @click="imgPreview2.openPreview()"
        >打开外层展示相册预览</se-button
      >
      <se-button @click="imgPreview2.closePreview()">关闭预览</se-button>
      <se-dialog
        title="温馨提示"
        v-model:visible="visible2"
        width="70vw"
        @close="closed2"
        closeable
      >
        <se-img
          v-for="i of [...Array(3).keys()]"
          :key="i + 10"
          :src="imgList[i + 10]"
          fit="contain"
          width="200"
          height="400"
          lazy
          :preview="{
            name: '测试1',
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
            },
            modal: false,
            scaleStep: 0.5,
            closeIcon: 'close',
            closeOnClickModal: true,
            closeOnPressEscape: true,
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
        </se-img></se-dialog
      >
      <se-img
        v-for="i of [...Array(2).keys()]"
        :key="i + 8"
        :src="imgList[i + 8]"
        fit="contain"
        width="200"
        height="400"
        lazy
        :preview="{
          name: '测试1',
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
      <template v-slot:footer></template>
    </se-dialog>
    <se-box
      ><se-select :options="options" v-model="imgPreviewIndex" />
      <se-button @click="openPreview(imgPreviewIndex)"
        >打开预览{{ imgPreviewIndex + 1 }}</se-button
      >
      <se-button @click="closePreview(imgPreviewIndex)"
        >关闭预览</se-button
      ></se-box
    >
    <se-img
      ref="imgPreview1"
      v-for="i of [...Array(8).keys()]"
      :key="i"
      :src="imgList[i]"
      fit="cover"
      width="400"
      lazy
      :preview="{
        name: '测试1',
      }"
    >
      <template #loading>
        <se-icon name="loading" color="#fff" iconSize="48px" />
      </template>
      <template #error>
        <se-icon name="roundclose" color="#fff" iconSize="48px" />
      </template>
      <template #mask>
        <se-icon name="piclight" color="#fff" iconSize="48px" />
      </template>
    </se-img>
    <se-img
      ref="imgPreview2"
      :src="imgList[3]"
      fit="cover"
      width="800"
      lazy
      :preview="{
        name: '测试2',
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
          show: true,
        },
      }"
    >
      <!-- <template #loading>
                <div>loading</div>
            </template>
            <template #error>
                <div>error</div>
            </template> -->
      <template #mask>
        <span> mask </span>
      </template>
    </se-img>
  </div>
</template>

<style scoped lang="less">
.edge-progress {
  width: 50vw;
  padding: 10px;
  border: 1px solid #000;
  user-select: none;
  transition: all 0.3s;
  cursor: pointer;
  overflow-x: hidden;

  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
