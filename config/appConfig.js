/*server configuration*/
const serverConfig = {
	port:3000,
	hostname: 'localhost'     //localhost ip is 127.0.0.1
}


/* database config*/
const dbConfig = {
	mongoUrl: 'mongodb://localhost/movieapp'
}

/*logger configuration*/
const loggerConfig = {
	appenders: {
		console: {
			type: 'console'
		},
		keepLogs: {
			type: 'file',
			filename: 'logs/keep.log'
		}
	},
	categories: {
		default: { appenders: ['console', 'keepLogs'], level: 'trace' }
	}
};

/* movie api key */
const movieApiKey = {
	key : 'aa873e620a56d318ee10dd52d96a9c6f'
}

module.exports = {
	dbConfig,
	serverConfig,
	loggerConfig,
	movieApiKey
}