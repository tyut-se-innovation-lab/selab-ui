import {
    componentPreview,
    containerPreview
} from '@vitepress-demo-preview/plugin'

export default {
    themeConfig: {
        siteTitle: "selab-ui",
        nav: [
            {text: "指南", link: "/guild/"},
            {text: "组件", link: "/components/"}
        ],
        socialLinks: [
            {icon: "github", "link": "https://github.com/tyut-se-innovation-lab/selab-ui"}
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
<<<<<<< HEAD
{
                text: "box",
                link: "/components/box/"
            },
	{
                text: "card",
                link: "/components/card/"
            },
	{
                text: "se-tag",
                link: "/components/se-tag/"
            },
	{
                text: "skeleton",
                link: "/components/skeleton/"
            },
	{
                text: "select",
                link: "/components/select/"
            },
	//]
=======
                        {
                            text: "box",
                            link: "/components/box/"
                        },
                        {
                            text: "card",
                            link: "/components/card/"
                        },
                        {
                            text: "select",
                            link: "/components/select/"
                        },
                        {
                            text: "skeleton",
                            link: "/components/skeleton/"
                        },
                        {
                            text: "tag",
                            link: "/components/tag/"
                        },
                        //]
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a

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