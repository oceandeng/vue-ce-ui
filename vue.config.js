const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 基本路径
  publicPath: '/',
  outputDir: 'dist',
  pages: {
    index: {
      // page入口
      entry: 'examples/views/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    },
    ui: {
      entry: 'examples/views/ui/main.js',
      template: 'public/ui.html',
      filename: 'ui.html'
    }
  },
//   configureWebpack: {
//       entry: resolve('packages/index.js'),
//       output: {
//           filename: 'CEUI.common.js'
//       }
//   },
  chainWebpack: config => {
    // 别名
    config.resolve.alias
      .set('~', resolve('/'))
      .set('@examples', resolve('examples'))
      .set('@packages', resolve('packages'))
      .set('@src', resolve('src'))
      .set('@views', resolve('examples') + '/views')
  },
  devServer: {
    port: '8081',
    open: true,
    hot: true
  }
}