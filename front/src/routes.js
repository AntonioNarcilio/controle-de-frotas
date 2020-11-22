const express = require('express')

const router = express.Router()

const path = require('path')


router.get('/', (req, res) => {
	// res.sendFile(path.join(__dirname, 'views', 'home', 'index.html'))
	return res.render('home/index.html',
	{title: 'Home - Hello Word'})
})

router.get('/funcionarios', (req, res) => {

	return res.render('funcionarios/index.html',
	{title: 'Funcionários'}
	)
})



module.exports = router