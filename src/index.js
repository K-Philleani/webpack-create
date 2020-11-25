/*
  index.js: webpack入口起点文件
 		1. 运行指令:
 			开发环境：webpack ./src/index.js -o ./build --mode=development
 							webpack会以./src/index.js为入口文件开始打包,打包后输出到./build，整体打包环境是开发环境
   		生产环境: webpack ./src/index.js -o ./build --mode=production
   						webpack会以./src/index.js为入口文件开始打包,打包后输出到./build，整体打包环境是生产环境
   	2. webpack：
   	 		能处理js和json资源,不能处理css，img等
   	 		生产环境和开发环境将ES6的模块编译成浏览器能识别的模块
   	 		生产环境比开发环境多一个js压缩
 */
import './index.css'
import './index.less'
import data from './data.json'
console.log(data)

function add(x, y) {
	return x + y
}

console.log(add(1, 2))