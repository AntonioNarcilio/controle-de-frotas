const express = require('express')
const app = express()

const routes = require('./routes')

// Config porta da aplicação
const PORT = process.env.PORT || 3333
// A ser utilizado caso crie uma image no docker
// const HOST = '0.0.0.0' 

app.use(express.json())
app.use(routes)


// Notfound
app.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status = 404
	next(error)
})

// Capturando error
app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({error: error.message})
})

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta 🚪 ${PORT}`)
})