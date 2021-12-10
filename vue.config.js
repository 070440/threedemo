module.exports = {
    chainWebpack: config => {
        config.module
            .rule('raw')
            .test(/\.(vs|fs)$/i)
            .use('raw-loader')
            .loader('raw-loader')
            .end()
    }
};