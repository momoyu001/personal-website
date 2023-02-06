export default {
    title: 'VitePress',
    description: 'Just playing around.',
    themeConfig: {
        siteTitle: 'momoyu', // false 不展示左上角的网站标题；也可自定义网站标题；不配置该项时，会默认采用 config.title 的值
        nav: [
            // 链接的路径设置为不带 .md 前缀的实际文件，并始终以 / 开头。
            { text: '面试', link: '/greeting' },
            { text: '数据结构和算法', link: '' },
            { text: 'JavaScript', link: '' },
            { text: 'Vue', link: '' },
            { text: 'React', link: '' },
            { text: '源码', link: '' },
            { text: '日常随笔', link: '' },
            { text: '其他', link: '' },
        ],
    },
};
