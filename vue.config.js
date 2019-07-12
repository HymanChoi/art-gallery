// vue.config.js
const path = require("path")

function resolve(dir) {
	return path.join(__dirname, ".", dir)
}

module.exports = {
	/** 区分打包环境与开发环境
	 * process.env.NODE_ENV==='production'  (打包环境)
	 * process.env.NODE_ENV==='development' (开发环境)
	 * publicPath: process.env.NODE_ENV === 'production' ? "https://cdn.didabisai.com/front/" : 'front/',
	 */
	// 项目部署的基础路径
	// 我们默认假设你的应用将会部署在域名的根部,
	// 例如 https://www.my-app.com/
	// 如果你的应用部署在一个子路径下，那么你需要在这里
	// 指定子路径。比如将你的应用部署在
	// https://www.foobar.com/my-app/
	// 那么将这个值改为 '/my-app/'
	publicPath:
		process.env.NODE_ENV === "production" // 构建好的文件输出到哪里
			? "/production-sub-path/"
			: "/",
	outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
	lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
	runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
	transpileDependencies: [
		/* string or regex */
	], // 是否为生产环境构建生成sourceMap?
	productionSourceMap: false, // 调整内部的webpack配置.
	chainWebpack: config => {
		config.module.rules.delete("svg") //重点:删除默认配置中处理svg,
		//const svgRule = config.module.rule('svg')
		//svgRule.uses.clear()
		config.module
			.rule("svg-sprite-loader")
			.test(/\.svg$/)
			.include.add(resolve("src/icons")) //处理svg目录
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "icon-[name]"
			})
	},
	configureWebpack: () => {}, // CSS 相关选项
	css: {
		// 将组件内部的css提取到一个单独的css文件（只用在生产环境）
		// 也可以是传递给 extract-text-webpack-plugin 的选项对象
		extract: true, // 允许生成 CSS source maps?
		sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
		loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
		modules: false
	}, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores
	parallel: require("os").cpus().length > 1, // PWA 插件相关配置
	// configure webpack-dev-server behavior
	pwa: {
		iconPaths: {
			favicon32: "art.ico"
		}
	},
	devServer: {
		open: process.platform === "darwin",
		disableHostCheck: false,
		hot: true,
		hotOnly: true,
		host: "0.0.0.0",
		port: 8081,
		proxy: {
			"/home": {
				target: "http://localhost:3000"
			},
			"/artists": {
				target: "http://localhost:3000"
			},
			"/artistHome/*": {
				target: "http://localhost:3000"
			},
			"/artworks": {
				target: "http://localhost:3000"
			},
			"/artworkHome/*": {
				target: "http://localhost:3000"
			},
			"/users/*": {
				target: "http://localhost:3000"
			},
			"/userHome/*": {
				target: "http://localhost:3000"
			},
			"/managers/*": {
				target: "http://localhost:3000"
			},
			"/managerHome/*": {
				target: "http://localhost:3000"
			},
			"/upload/*": {
				target: "http://localhost:3000"
			},
			"/search/*": {
				target: "http://localhost:3000"
			}
		}
	},
	// 第三方插件配置
	pluginOptions: {
		// ...
	}
}
