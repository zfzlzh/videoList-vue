
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "./src/assets/styles/base";`,
            },
			scss: {
			    additionalData: `@import ./static/css/global.scss";`
			},
        },
    },
	
}
