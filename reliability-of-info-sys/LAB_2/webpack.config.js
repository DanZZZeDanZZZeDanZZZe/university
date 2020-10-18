const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = (env = {}, argv = {}) => {
  const isDev = argv.mode === "development"
  const isProd = !isDev
  
  const filename = ext => isDev 
    ? `[name].${ext}` 
    : `[name].[hash].${ext}`

  const optimization = () => {
    const config = {
      splitChunks: {
        chunks: 'all'
      }
    }

    if (isProd) {
      config.minimize = true
      config.minimizer = [
        new OptimizeCssAssetWebpackPlugin(),
        new TerserPlugin({
          cache: true,
        }),
      ]
    }

    return config
  }

  const plugins = () => {
    const base = [
      new HTMLWebpackPlugin({
        template: './index.html',
        minify: {
          collapseWhitespace: isProd
        }
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: filename('css')
      }),
      new LodashModuleReplacementPlugin,
    ]
    return base
  }

  const jsLoaders = extra => {
    const loaders = [{
      loader: 'babel-loader',
      options: {
        plugins:['lodash'],
        presets: [
          '@babel/preset-env',
        ],
      }
    }]
  
    if (extra) {
      loaders.push(extra)
    }

    return loaders
  }

  const cssLoaders = extra => {
    const loaders = [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: isDev,
          reloadAll: true
        }
      }, 
      'css-loader'
    ]
  
    if (extra) {
      loaders.push(extra)
    }
  
    return loaders
  }

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['./index.js'],
    },
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, 
          use: jsLoaders(),
        },
        {
          test: /\.css$/,
          use: cssLoaders(),
        },
        {
          test: /\.txt$/,
          use: [
            {
              loader: 'raw-loader',
              options: {
                esModule: false,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.css'], 
    },
    externals: {
      moment: 'moment'
    },
    devServer: {
      watchContentBase: true,
      port: 3000,
      hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
  } 
}