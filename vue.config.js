const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
  configureWebpack: {
    plugins: [
      new WebpackAutoInject({
        PACKAGE_JSON_PATH: './package.json',
        SHORT: 'MJSZ-VBR-WIDGET',
        components: {
          InjectAsComment: true
        },
        componentsOptions: {
          InjectAsComment: {
            tag: 'Build version: {version} - {date}',
            dateFormat: 'dddd, mmmm dS, yyyy, h:MM:ss TT',
            multiLineCommentType: false
          }
        }
      })
    ]
  }
};
