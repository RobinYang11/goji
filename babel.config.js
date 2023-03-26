


module.exports = {
	presets: [
		'@babel/preset-env',
		['@babel/preset-react', { runtime: 'automatic' }],
	],
	"plugins": [
		[
		  "component",
		  {
			"libraryName": "element-ui",
			"styleLibraryName": "theme-chalk"
		  }
		]
	  ]
}