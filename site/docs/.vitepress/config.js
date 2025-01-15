import {
    componentPreview,
    containerPreview
} from '@vitepress-demo-preview/plugin'

export default {
    themeConfig: {
        siteTitle: "selab-ui",
        nav: [
            { text: "指南", link: "/guild/" },
            { text: "组件", link: "/components/" }
        ],
        socialLinks: [
            { icon: "github", "link": "https://github.com/tyut-se-innovation-lab/selab-ui" }
        ],
        sidebar: {
            "/guild/": [
                {
                    text: "基础",
                    items: [
                        {
                            text: "安装",
                            link: "/guild/installation/",
                        },
                        {
                            text: "快速开始",
                            link: "/guild/quickstart/",
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