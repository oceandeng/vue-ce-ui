const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {

  pages: {
    index: {
      // page入口
      entry: 'examples/main.js',
      // 模板来源
      templage: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  },

  // configureWebpack: () => {
  //   return {
  //     entry: "./src/ce-ui/index.js",
  //     output: {
  //       path: path.resolve(__dirname, "./dist"),
  //       filename: "CEUI.js",
  //       library: "CEUI",
  //       libraryTarget: 'umd',
  //       umdNamedDefine: true
  //     }
  //   }
  // },
  chainWebpack: config => {
    // 别名
    config.resolve.alias
      .set('@components', resolve('src') + '/components')
      .set('@ui', resolve('src') + '/ui')
      .set('~', resolve('/'))
  },
  devServer: {
    port: '8081',
    open: true,
    hot: true
  }
}