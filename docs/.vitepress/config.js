export default {
    title: 'VitePress',
    description: 'Just playing around.',
    themeConfig: {
        siteTitle: 'momoyu', // false 不展示左上角的网站标题；也可自定义网站标题；不配置该项时，会默认采用 config.title 的值
        nav: [
            // 链接的路径设置为不带 .md 前缀的实际文件，并始终以 / 开头。
            { text: '面试', link: '/interview/' },
            { text: '数据结构和算法', link: '/algorithm/' },
            { text: 'JavaScript', link: '/javascript/' },
            { text: 'Vue', link: '/vue/' },
            { text: 'React', link: '/react/' },
            { text: '源码', link: '/sourcecode/' },
            { text: '日常随笔', link: '/daily/' },
            { text: '其他', link: '' },
        ],
        sidebar: {
            '/interview/': [
                {
                    text: '面试',
                    items: [
                        { text: '面试整理-按公司分类', link: '/interview/company' },
                        { text: '面试整理-按模块分类', link: '/interview/module' },
                    ],
                },
            ],
            '/algorithm/': [
                {
                    text: '数据结构和算法',
                    items: [
                        { text: '算法笔记', link: '/algorithm/note' },
                        { text: '数据结构和算法专栏笔记', link: '/algorithm/introduction' },
                    ],
                },
            ],
            '/javascript/': [
                {
                    text: 'JavaScript',
                    items: [
                        { text: 'JS 笔记', link: '/javascript/JS笔记' },
                        { text: 'JS 手写题', link: '/javascript/JS手写题' },
                        { text: 'Proxy&Reflect&装饰器', link: '/javascript/Proxy&Reflect&装饰器' },
                        { text: 'TypeScript', link: '/javascript/typescript' },
                    ],
                },
            ],
            '/vue/': [
                {
                    text: 'Vue',
                    items: [
                        { text: 'vue3 学习笔记', link: '/vue/vue3学习笔记' },
                        { text: 'vue-class-component', link: '/vue/vueClassComponent' },
                    ],
                },
            ],
            '/react/': [
                {
                    text: 'React',
                    items: [],
                },
            ],
            '/sourcecode/': [{ text: '源码', items: [] }],
            '/daily/': [{ text: '日常随笔', items: [] }],
        },
    },
};
