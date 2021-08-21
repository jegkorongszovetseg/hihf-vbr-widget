const WebpackAutoInject = require('webpack-auto-inject-version');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  productionSourceMap: false,
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
            dateFormat: 'yyyy-mm-dd HH:mm:ss',
            multiLineCommentType: false
          }
        }
      }),

      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.7
      }),

      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.7
      })
    ]
  }
};
