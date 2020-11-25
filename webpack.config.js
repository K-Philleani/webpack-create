/*
	webpack.config.js （webpack的配置文件）
		1.作用:指示webpack需要做的事, 当运行webpack指令时会加载里面的配置
		2.所有构件工具都基于node.js平台运行，模块化默认采用commonJS
 */

// resolve是node.js中path模块的方法，用于拼接绝对路径
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = { // webpack配置
	entry: './src/index.js', 	// 入口起点
	output: { // 输出
		filename: "built.js", // 输出文件名
		path: resolve(__dirname, 'build'), // 输出路径，__dirname是node.js的变量，代表当前文件的目录绝对路径
	},
	module: { // loader的配置
		rules: [ // 详细的loader配置
			{
				test: /\.css$/, // 匹配哪些文件
				use: [ // 使用哪些loader进行处理，use数组先执行写在后面的loader
					'style-loader', // 创建style标签,将js中的样式资源插入，添加到head中生效
					'css-loader' // 将css文件转成commonJS模块加载进js中,里面的内容是样式字符串
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader' // 将less文件编译成css文件(需要下载less-loader和less)
				]
			},
			{
				test: /\.(jpg|jpeg|png|gif)$/, // 处理图片资源, 存在的问题；无法处理HTML文件中的img图片
				use: [{
					loader: 'url-loader' , // 只使用url-loader(url-loader依赖file-loader)
					options: { // 相应的配置
						limit: 8 * 1024, // 当图片size小于8Kb，就会用base64处理(优点：减少请求数量，缺点：图片体积会变大)
						esModule: false, // 问题: 可能会出现src引入[Object Module]的问题；因为url-loader默认使用es6模块化解析，html-loader使用commonJS引入图片，解决办法：关闭url-loader的es6模块化没使用commonJS
						name: '[hash:4].[ext]' // 给图片重命名 [hash:10]:取图片hash值得前10位, [ext]:取文件的原来的扩展名
					} 
				}],
			},
			{
				test: /\.html$/, // 处理HTML文件中的img图片
				loader: 'html-loader',  // use: [{loader: 'html-loader'}]的简写
			},
			{ // 打包其他资源
				exclude: /\.(css|less|js|html|json)$/, // 排除对应的资源
				loader: 'file-loader',
				options: {
					name: '[hash:8].[ext]' // options选项应该写在use里，但是 use: [{loader: ''}]简写时，可以与loader写在同级
				}
			}
		]
	},
	plugins: [ // plugins的配置
		// 打包html资源, html-webpack-plugin: 默认会创建一个html文件，自动引入打包输出的所有资源(JS/CSS)
		new HtmlWebpackPlugin({
			template: './src/index.html', // 复制 ./src/index.html 这个文件，自动引入打包输出的所有资源(JS/CSS)
		})
	],
	// 模式
	mode: "development"  // 开发模式
	// mode: "production"  // 生产模式
}