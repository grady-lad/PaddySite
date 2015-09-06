{
	appDir: "./../public/scripts",
	mainConfigFile: "./../public/scripts/require.config.js",
	baseUrl: '.',
	dir: "./../dist",
	modules:[
		{
			name: "require.config",
			out: "require.config.dist",
			include: [
				"helper",
				"jquery",
				"bootstrap"
			]
		},

		{
			name: "initFront",
			include: [
				"views/singleDetailView"
			]
		},

		{
			name: "initPanel",
			include: [
				"views/uploadPanelView"
			]
		}


	]
	
} 