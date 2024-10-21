<template>
    <div>
        <se-img
            src="https://pic.imgdb.cn/item/65c1fec99f345e8d03a4d7b4.jpg"
            fit="contain"
            width="400"
            lazy
            :preview="{
                name: '测试1',
                animation: 'slide',
                isAlbum: true,
                albumList: [
                    'https://pic.imgdb.cn/item/65c1fec99f345e8d03a4d7b4.jpg',
                    'https://pic.imgdb.cn/item/65c1ff5d9f345e8d03a66b58.jpg'
                ],
                loop: true,
                modal: true
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
                <span
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
                    mask
                </span>
            </template>
        </se-img>
    </div>
</template>

<!-- <script>

</script> -->

<!-- <style scoped>
</style> -->
