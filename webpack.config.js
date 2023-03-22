
const fs = require('fs');
const path = require('path')
const process = require('process');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const config = {
	entry: "./vue/App.vue",
	// entry: "./src/_test.tsx",
	mode: process.env.NODE_ENV === "development" ? "development" : "production",
	output: {
		filename: "[name].js",
		publicPath: process.env.NODE_ENV === "development" ? "/" : "/static",

		path: path.resolve(__dirname, "./test")
	},
	resolve: {
		extensions: ['.js', '.tsx', '.jsx'],
		fallback: {
			'react/jsx-runtime': 'react/jsx-runtime.js',
			'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
		},
		alias: {
			'@src': path.resolve(__dirname, './src'),
			'@api': path.resolve(__dirname, './src/api'),
			'@common': path.resolve(__dirname, './src/common'),
			'@components': path.resolve(__dirname, './src/components'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@util': path.resolve(__dirname, './src/util'),
		},

	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		host: "127.0.0.1",
		hot: true, //热更新
		open: true,
		compress: true, // 静态资源 开启gzip 压缩
		port: 3004, // devserver 启动端口
		proxy: {
			"/api": {
				target: 'http://127.0.0.1:8001',
				// changeOrigin: true,
				secure: true,
				pathRewrite: {
					'/api': ''
				}
			}
		}
	},

	module: {
		rules: [
			 {
            /*将js文件转码成es5*/
            test: /\.js?$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },         

			{
				test: /\.(js|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript'
						],
						plugins: [
							'transform-class-properties'
						]
					}
				},
			},
			{
				test: /\.(css|less)$/i, // 三个loader 都要安装
				use: [
					{ loader: "style-loader" },
					{
						loader: "css-loader",
					},
					{
						loader: "less-loader",
						options: {
							lessOptions: {
								modifyVars: {
									'@primary-color': '#FFC300',
									'link-color': '#FFC300',
									'border-radius-base': '8px',
								},
								javascriptEnabled: true,
							},
						}
					}
				],
			}
	
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('./index.html')
		}),

		new CompressionPlugin({
			include: /\/includes/,
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				assetPrefix: "https://app-test.zjhzoyad.com/material-prod/static/",
			}
		})
	]
}

if (process.env.NODE_ENV === "development") {
	config.devtool = "source-map"
}
module.exports = config;