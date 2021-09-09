import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerWebpackPlugin from 'image-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SitemapWebpackPlugin from 'sitemap-webpack-plugin';
import RobotstxtPlugin from 'robotstxt-webpack-plugin';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public'),
    assetModuleFilename: 'images/[name][ext]',
    clean: true,
  },
  devServer: {
    open: true,
    watchFiles: ['src/pug/*', 'src/images/*'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(ico|svg|jpe?g|png|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/pug/index.pug',
    }),
    new ImageMinimizerWebpackPlugin({
      minimizerOptions: {
        plugins: [
          'imagemin-pngquant',
          'imagemin-svgo',
          [
            'mozjpeg',
            {
              quality: 85,
              progressive: true,
            },
          ],
        ],
      },
    }),
    new MiniCssExtractPlugin(),
    new SitemapWebpackPlugin.default({
      base: 'https://ysportfolio.netlify.app/',
      paths: [
        {
          path: '',
          lastmod: '2021-09-09',
          priority: 1.0,
          changefreq: 'monthly',
        },
      ],
    }),
    new RobotstxtPlugin({}),
  ],
};
