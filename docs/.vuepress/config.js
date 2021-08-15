const { description } = require('../../package');
require('dotenv').config({
  path: `./.env${process.env.NODE_ENV === 'production' ? '.production.local' : ''}`
});
const webpack = require('webpack');
const path = require('path');

module.exports = {
  base: process.env.VUEPRESS_BASE,
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
        text: 'Widgetek',
        link: '/widgets/'
      },
      {
        text: 'Stílusok',
        link: '/styles/'
      },
      {
        text: 'VBR Api',
        link: '/vbr-api/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/Sokamoka/icehockey-vbr-widget'
      }
    ],
    sidebar: {
      '/widgets/': [
        {
          title: 'Bemutatás',
          collapsable: false,
          children: ['', 'using-widget', 'available-widgets']
        },
        {
          title: 'Widgetek',
          collapsable: false,
          children: ['standings']
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  // plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
  plugins: [],

  configureWebpack: config => {
    return {
      plugins: [
        new webpack.EnvironmentPlugin({
          VUE_APP_VBR_API_URL: 'https://api.icehockey.hu/vbr',
          VUE_APP_VBR_API_KEY: ''
        })
      ]
    };
  },

  alias: {
    '@': path.resolve(__dirname, '../../src')
  }
};
