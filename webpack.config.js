const path = require('path');
module.exports = {
    entry: './main.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public', 'scripts')
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '/images/[name].[ext]'
                }
            }
        ]
    }
};