const path = require('path');
const { EnvironmentPlugin, webpack, DefinePlugin } = require('webpack');
const WebpackBundleAnalyzer =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const tsImportPluginFactory = require('ts-import-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const startsWith = (start) => (str) => str.startsWith(start);
const environmentVariables = Object.keys(process.env).filter(
  startsWith('REACT_APP'),
);

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
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
    }),
    new Dotenv({
      path: isDevelopment
        ? path.join('.', '.env.dev')
        : path.join(__dirname, '../../.env.app'),
    }),
    new EnvironmentPlugin(environmentVariables),
    // ...(isDevelopment ? [new WebpackBundleAnalyzer()] : []),
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
