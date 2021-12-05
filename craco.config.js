const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [{
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: {
                        '@layout-header-background': '#ffffff',
                        '@layout-header-height': '48px',
                        '@layout-header-padding': '0 64px',
                        '@primary-color': '@purple-6',
                        '@info-color': '@magenta-6'
                        
                    },
                    javascriptEnabled: true
                }
            }
        }
    }]
};