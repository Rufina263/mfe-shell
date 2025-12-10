const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require('./package.json').dependencies;


module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: { port: 3000, historyApiFallback: true },
    module: { 
        rules: [
            {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]
                }
            }
            },
            {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
    new ModuleFederationPlugin({
        name: 'mfe_shell',
        remotes: {
            mfe_controls: 'mfe_controls@http://localhost:3001/remoteEntry.js',
            mfe_cards: 'mfe_cards@http://localhost:3002/remoteEntry.js'
        },
        shared: { 
            react: { singleton: true, requiredVersion: deps.react }, 
            'react-dom': { singleton: true, requiredVersion: deps['react-dom'] } 
        }
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' })
    ],
    resolve: { extensions: ['.js', '.jsx'] }
};