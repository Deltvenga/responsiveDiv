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
        ]
    }
};