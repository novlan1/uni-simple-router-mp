const path = require('path');
module.exports = {
    parser: require('postcss-comment'),
    plugins: [
        require('postcss-import')({
            resolve(id) {
                if (id.startsWith('~@/')) {
                    return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3));
                } if (id.startsWith('@/')) {
                    return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2));
                } if (id.startsWith('/') && !id.startsWith('//')) {
                    return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1));
                }
                return id;
            }
        }),
        require('autoprefixer')({
            remove: process.env.UNI_PLATFORM !== 'h5'
        }),
        require('@dcloudio/vue-cli-plugin-uni/packages/postcss')
    ]
};
