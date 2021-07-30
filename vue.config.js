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
  }
}
