import {
    componentPreview,
    containerPreview
} from '@vitepress-demo-preview/plugin'
import {defineConfig} from "vite";

export default defineConfig({
    lang: 'en-US',
    base: '/selab-ui/',
    ignoreDeadLinks: true,
    title:"selab-ui",
    siteTitle: "selab-ui",
    description: 'selab-ui 组件库',
    lastUpdated: true,
    themeConfig: {
        logo: '/logo.png',
        nav: [
            {text: "指南", link: "/guild/installation/"},
            {text: "组件", link: "/components/typography/"}
        ],
        socialLinks: [
            {icon: "github", "link": "https://github.com/tyut-se-innovation-lab/selab-ui"}
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present The Muse Catcher',
        },
        search: {
            provider: 'local'
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
                    text: "通用组件",
                    collapsed: false,
                    items: [
                        {
                            text: "Typography",
                            link: "/components/typography/"
                        },
                        {
                            text: "Button",
                            link: "/components/button/",
                        },
                        {
                            text: "Icon",
                            link: "/components/icon/"
                        },

                    ]
                },
                {
                    text: "布局组件",
                    collapsed: false,
                    items: [
                        {
                            text: "Flex",
                            link: "/components/flex/"
                        },
                        {
                            text: "Grid",
                            link: "/components/grid/"
                        },
                        {
                            text: "Box",
                            link: "/components/box/"
                        },
                        {
                            text: "Divider",
                            link: "/components/divider/"
                        },
                    ]
                },
                {
                    text: "数据录入",
                    collapsed: false,
                    items: [
                        {
                            text: "Checkbox",
                            link: "/components/checkbox/"
                        },
                        {
                            text: "EdgeProgress",
                            link: "/components/edgeprogress/"
                        },
                        {
                            text: "Input",
                            link: "/components/input/"
                        },
                        {
                            text: "Radio",
                            link: "/components/radio/"
                        },
                        {
                            text: "Rate",
                            link: "/components/rate/"
                        },
                        {
                            text: "Select",
                            link: "/components/select/"
                        },
                        {
                            text: "Switch",
                            link: "/components/switch/"

                        },
                        {
                            text: "Slider",
                            link: "/components/slider/"
                        },
                    ]
                },
                {
                    text: "数据展示",
                    collapsed: false,
                    items: [
                        {
                            text: "Img",
                            link: "/components/img/"
                        },
                        {
                            text: "Card",
                            link: "/components/card/"
                        },
                        {
                            text: "Tag",
                            link: "/components/tag/"
                        },
                        {
                            text: "Table",
                            link: "/components/table/"
                        },
                        {
                            text: "Tooltip",
                            link: "/components/tooltip/"
                        },
                    ]
                },
                {
                    text: "反馈组件",
                    collapsed: false,
                    items: [
                        {
                            text: "Dialog",
                            link: "/components/dialog/"
                        },
                        {
                            text: "Message",
                            link: "/components/message/"
                        },
                        {
                            text: "MiniMsg",
                            link: "/components/minimsg/"
                        },
                        {
                            text: "Skeleton",
                            link: "/components/skeleton/"
                        },
                    ]
                },
                {
                    text: "其他组件",
                    collapsed: false,
                    items: [


                        {
                            text: "VirtualScroller",
                            link: "/components/virtualscroller/"
                        },

	//]

                    ]
                },

            ],

            "/currency/": []
        }

    },
    markdown: {
        lineNumbers: true,
        config(md) {
            md.use(componentPreview)
            md.use(containerPreview)
        }
    }
})
