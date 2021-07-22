const path = require('path');
const { EnvironmentPlugin, webpack, DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const startsWith = (start) => (str) => str.startsWith(start);
const environmentVariables = Object.keys(process.env).filter(startsWith('REACT_APP'));
const isDevelopment = process.env.NODE_ENV === 'production' ? 'development' : 'production';
const tsConfig = process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  mode: process.env.NODE_ENV == 'development' ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.join('.', 'tsconfig.json'),
          // configFile: path.join('.', 'tsconfig.prod.json'),
          projectReferences: true,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         lessOptions: {
      //           javascriptEnabled: true,
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    // use html plugin to just load our index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
    }),
    new EnvironmentPlugin(environmentVariables),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsConfigPathsPlugin()],
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};
