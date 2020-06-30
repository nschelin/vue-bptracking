module.exports = {
	transpileDependencies: ['vuetify'],
	devServer: {
		proxy: {
			'/api': {
				target: process.env.VUE_API_URL,
				changeOrigin: true
			}
		}
	}
};
