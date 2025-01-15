import {
    componentPreview,
    containerPreview
} from '@vitepress-demo-preview/plugin'

export default {
    base: '/selab-ui/',
    themeConfig: {
        siteTitle: "selab-ui",
        description: 'selab-ui 组件库',

        nav: [
            { text: "指南", link: "/guild/installation/" },
            { text: "组件", link: "/components/button/" }
        ],
        socialLinks: [
            { icon: "github", "link": "https://github.com/tyut-se-innovation-lab/selab-ui" }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present The Muse Catcher',
        },
        algolia: { // algolia 搜索服务 与 内置 search 可二选一
            appId: 'SHDNEYGA8Z',
            apiKey: '91419401b0b0efd31b610e54e5b97249',
            indexName: 'vue-amazing-ui'
        },

        sidebar: {
            "/guild/": [
                {
                    text: "基础",
                    items: [
                        {
                            text: "快速开始",
                            link: "/guild/installation/",
                        },
                        {
                            text: "更新日志",
                            link: "/guild/updateLog/",
                        }
                    ]
                }
            ],
            "/components/": [
                {
                    text: "基础组件",
                    items: [
                        {
                            text: "Button",
                            link: "/components/button/",
                        },
                        {
                            text: "Box",
                            link: "/components/box/"
                        },
                        {
                            text: "Card",
                            link: "/components/card/"
                        },
                        {
                            text: "Select",
                            link: "/components/select/"
                        },
                        {
                            text: "Skeleton",
                            link: "/components/skeleton/"
                        },
                        {
                            text: "Tag",
                            link: "/components/tag/"
                        },
                        {
                            text: "Message",
                            link: "/components/message/"
                        },
                        {
                            text: "Img",
                            link: "/components/img/"
                        },

                        {
                            text: "Icon",
                            link: "/components/icon/"
                        },
                        {
                            text: "MiniMsg",
                            link: "/components/minimsg/"
                        },
                        {
                            text: "Tooltip",
                            link: "/components/tooltip/"
                        },
                        {
                            text: "Contextmenu",
                            link: "/components/contextmenu/"
                        },
                        {
                            text: "Dialog",
                            link: "/components/dialog/"
                        },
                        {
                            text: "Rate",
                            link: "/components/rate/"
                        }, {
                            text: "Switch",
                            link: "/components/switch/"

                        },
                        {
                            text: "Radio",
                            link: "/components/radio/"
                        },
                        {
                            text: "Checkbox",
                            link: "/components/checkbox/"
                        },
                        {

                            text: "Slider",
                            link: "/components/slider/"
                        },
                        {
            text: "EdgeProgress",
            link: "/components/edgeprogress/"
        },
	{
            text: "Table",
            link: "/components/table/"
        },
	//]

                    ]
                }
            ]
        }

    },
    markdown: {
        lineNumbers: true,
        config(md) {
            md.use(componentPreview)
            md.use(containerPreview)
        }
    }
}
