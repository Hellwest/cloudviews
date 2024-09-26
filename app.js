const http = require('http')
const fs = require('fs')

const CONTENT_FOLDER_NAME = './public'
const APP_PORT = 8000

http.createServer((req, res) => {
	req.on('error', (error) => {
		console.error(error)
		res.statusCode = 400
		res.end('400: Bad request')
		return
	})

	res.on('error', (error) => {
		console.error(error)
		res.statusCode = 500
		res.end('500: Internal server error')
		return
	})

	if (req.url === '/' && req.method === 'GET') {
		const fileNames = []
		const files = fs.readdirSync(CONTENT_FOLDER_NAME)
		files.forEach((filename) => fileNames.push(filename))

		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.write(JSON.stringify({ "items": fileNames }))
		res.end()
		return
	}

	fs.readFile(CONTENT_FOLDER_NAME + req.url, (error, data) => {
		if (error) {
			console.log(error)
			res.statusCode = 404
			res.end('404: File not found')
			return
		}

		res.setHeader('Content-Type', 'image/jpg')
		res.end(data)
		return
	})
}).listen(APP_PORT, () => console.log(`Server is running on port ${APP_PORT}`))

