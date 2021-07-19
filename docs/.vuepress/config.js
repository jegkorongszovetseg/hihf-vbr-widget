const { description } = require('../../package');
require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  configureWebpack: config => {
    return {
      plugins: [
        new webpack.EnvironmentPlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.VUE_APP_VBR_API_KEY': JSON.stringify(process.env.VUE_APP_VBR_API_KEY)
        })
      ]
    };
  },
  base: process.env.VUE_APP_DOCS_BASE_URL,
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'MJSZ VBR Widgets',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
    // ['script', { src: 'https://preprodapi.icehockey.hu/static/files/vbr-official-bundle.umd.js', charset: 'utf-8' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'Config',
        link: '/config/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Widgetek',
          collapsable: false,
          children: ['', 'using-vue', 'standings']
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
};
