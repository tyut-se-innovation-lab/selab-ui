<template>
    <div>
        <se-img
            src="https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF"
            fit="cover"
            width="400"
            lazy
            :preview="{
                name: '测试1',
                animation: 'slide',
                album: true,
                albumList: [
                    'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
                    'https://t7.baidu.com/it/u=2529476510,3041785782&fm=193&f=GIF'
                ],
                loop: false,
                modal: false
            }"
            :contextmenu="false"
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
