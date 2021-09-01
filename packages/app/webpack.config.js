const path = require('path');
const { EnvironmentPlugin, webpack, DefinePlugin } = require('webpack');
const WebpackBundleAnalyzer =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const tsImportPluginFactory = require('ts-import-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const startsWith = (start) => (str) => str.startsWith(start);
const environmentVariables = Object.keys(process.env).filter(
  startsWith('REACT_APP'),
);

const htmlWebpackPluginOptions = {
  template: path.resolve(__dirname, 'src', 'index.html'),
  inject: false,
};

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
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
          projectReferences: true,
          // This seem not to work
          // getCustomTransformers: () => ({
          // before: [
          // tsImportPluginFactory({
          //   libraryName: '@material-ui/core',
          //   libraryDirectory: '',
          //   camel2DashComponentName: false,
          // }),
          //   ],
          // }),
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginOptions),
    // This second one is useful for surge.sh deployment
    new HtmlWebpackPlugin({
      ...htmlWebpackPluginOptions,
      filename: '200.html',
    }),
    new Dotenv({
      path: isDevelopment
        ? path.join('.', '.env.dev')
        : path.join(__dirname, '../../.env.app'),
    }),
    new EnvironmentPlugin(environmentVariables),
    // ...(isDevelopment ? [new WebpackBundleAnalyzer()] : []),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'CNAME'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
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
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
};
