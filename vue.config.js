/*
 * @Author: zfz
 * @Date: 2021-07-30 16:09:26
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-22 09:30:48
 * @Description: update
 */
const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
		  path.resolve(__dirname,`./static/css/global.scss`),
		  path.resolve(__dirname,`./static/css/button.scss`),
	  ]
    }
  },
  devServer: {
    proxy: {
      '/': {
        target: 'http://127.0.0.1:3000', //API服务器的地址
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        ws:false,
        pathRewrite: {
          '^/': '/',
          '^/': '',
        }
      }
    },
  }
}
