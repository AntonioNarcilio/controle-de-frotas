const express = require('express')
const routes = express.Router()

const FuncionarioController = require('./controllers/FuncionarioController')
const DepartamentoController = require('./controllers/DepartamentoController')
const VeiculoController = require('./controllers/VeiculoController')
const MultaController = require('./controllers/MultaController')


routes
	// FUNCIONÁRIO
	.get('/funcionario', FuncionarioController.index)
	.get('/funcionarios/:id', FuncionarioController.filter)
	.post('/funcionario', FuncionarioController.create)
	.put('/funcionario/:id', FuncionarioController.update)
	.delete('/funcionario/:id', FuncionarioController.delete)

	// DEPARTAMENTO
	.get('/departamento', DepartamentoController.index)
	.get('/departamento/:id', DepartamentoController.filter)
	.post('/departamento', DepartamentoController.create)
	.put('/departamento/:id', DepartamentoController.update)
	.delete('/departamento/:id', DepartamentoController.delete)

	// VEICULO
	.get('/veiculo', VeiculoController.index)
	.get('/veiculo/:id', VeiculoController.filter)
	.post('/veiculo', VeiculoController.create)
	.put('/veiculo/:id', VeiculoController.update)
	.delete('/veiculo/:id', VeiculoController.delete)

	// MULTA
	.get('/multa', MultaController.index)
	.get('/multa/:id', MultaController.filter)
	.post('/multa', MultaController.create)
	.put('/multa/:id', MultaController.update)
	.delete('/multa/:id', MultaController.delete)
	

module.exports = routes