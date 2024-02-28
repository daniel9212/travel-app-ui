import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';
import type { Configuration as WebpackConfig } from 'webpack';

const env = process.env.NODE_ENV as 'production' | 'development' | undefined;

interface Configuration extends WebpackConfig, WebpackDevServerConfig {}
const config: Configuration = {
  mode: env ?? 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    port: 8080,
    static: ['./public'],
    hot: true,
  },
  devtool: env === 'production' ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

export default config;
