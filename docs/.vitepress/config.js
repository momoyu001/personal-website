export default {
    title: 'VitePress',
    description: 'Just playing around.',
    base: '/personal-website/',
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
            { text: '其他', link: '/other/' },
        ],
        sidebar: {
            '/interview/': [
                {
                    text: '面试',
                    items: [
                        {
                            text: '面试整理-按公司分类',
                            collapsible: true,
                            collapsed: true,
                            items: [
                                { text: '笔记一', link: '/interview/company/company1' },
                                { text: '笔记二', link: '/interview/company/company2' },
                                { text: '笔记三', link: '/interview/company/company3' },
                                { text: '笔记四', link: '/interview/company/company4' },
                            ],
                        },
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
                        {
                            text: 'vue3 学习笔记',
                            collapsible: true,
                            collapsed: true,
                            items: [
                                { text: '笔记一', link: '/vue/vue3学习笔记/note1' },
                                { text: '笔记二', link: '/vue/vue3学习笔记/note2' },
                                { text: '笔记三', link: '/vue/vue3学习笔记/note3' },
                                { text: '笔记四', link: '/vue/vue3学习笔记/note4' },
                                { text: '笔记五', link: '/vue/vue3学习笔记/note5' },
                                { text: '笔记六', link: '/vue/vue3学习笔记/note6' },
                                { text: '笔记七', link: '/vue/vue3学习笔记/note7' },
                                { text: '笔记八', link: '/vue/vue3学习笔记/note8' },
                                { text: '笔记九', link: '/vue/vue3学习笔记/note9' },
                                { text: '笔记十', link: '/vue/vue3学习笔记/note10' },
                                { text: '笔记十一', link: '/vue/vue3学习笔记/note11' },
                            ],
                        },
                        { text: 'vue-class-component', link: '/vue/vueClassComponent' },
                        { text: 'vue是如何发布的', link: '/vue/vue是如何发布的' },
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
            '/other/': [
                {
                    text: '其他',
                    items: [
                        { text: 'webpack', link: '/other/webpack' },
                        { text: 'git', link: '/other/git' },
                        { text: 'github-actions', link: '/other/github-actions' },
                        { text: 'YAML', link: '/other/YAML' },
                    ],
                },
            ],
        },
    },
};
