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
{
                text: "box",
                link: "/components/box/"
            },
	{
                text: "card",
                link: "/components/card/"
            },
	//]

                    ]
                }
            ]
        }
    }
}