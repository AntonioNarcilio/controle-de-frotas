const express = require('express')
const routes = express.Router()

const FuncionarioController = require('./controllers/FuncionarioController')
const DepartamentoController = require('./controllers/DepartamentoController')
const VeiculoController = require('./controllers/VeiculoController')
const MotoristaController = require('./controllers/MotoristaController')
const MultaController = require('./controllers/MultaController')
const ManutencaoController = require('./controllers/ManutencaoController')
const SolicitacaoController = require('./controllers/SolicitacaoController')
const LocacaoController = require('./controllers/LocacaoController')


routes
	// FUNCIONÁRIO
	.get('/funcionarios', FuncionarioController.index)
	.get('/funcionario/:id', FuncionarioController.filter)
	.get('/funcionario', FuncionarioController.search)
	.post('/funcionario', FuncionarioController.create)
	.put('/funcionario/:id', FuncionarioController.update)
	.delete('/funcionario/:id', FuncionarioController.delete)

	// DEPARTAMENTO
	.get('/departamentos', DepartamentoController.index)
	.get('/departamento/:id', DepartamentoController.filter)
	.get('/departamento', DepartamentoController.search)
	.post('/departamento', DepartamentoController.create)
	.put('/departamento/:id', DepartamentoController.update)
	.delete('/departamento/:id', DepartamentoController.delete)

	// VEICULO
	.get('/veiculos', VeiculoController.index)
	.get('/veiculo/:id', VeiculoController.filter)
	.post('/veiculo', VeiculoController.create)
	.put('/veiculo/:id', VeiculoController.update)
	.delete('/veiculo/:id', VeiculoController.delete)

	// MOTORISTA
	.get('/motoristas', MotoristaController.index)
	.get('/motorista/:id', MotoristaController.filter)
	.post('/motorista', MotoristaController.create)
	.put('/motorista/:id', MotoristaController.update)
	.delete('/motorista/:id', MotoristaController.delete)

	// MULTA
	.get('/multas', MultaController.index)
	.get('/multa/:id', MultaController.filter)
	.post('/multa', MultaController.create)
	.put('/multa/:id', MultaController.update)
	.delete('/multa/:id', MultaController.delete)


	// MANUTENCAO
	.get('/manutencoes', ManutencaoController.index)
	.get('/manutencao/:id', ManutencaoController.filter)
	.post('/manutencao', ManutencaoController.create)
	.put('/manutencao/:id', ManutencaoController.update)
	.delete('/manutencao/:id', ManutencaoController.delete)

	// SOLICITACAO
	.get('/solicitacoes', SolicitacaoController.index)
	.get('/solicitacao/:id', SolicitacaoController.filter)
	.post('/solicitacao', SolicitacaoController.create)
	.put('/solicitacao/:id', SolicitacaoController.update)
	.delete('/solicitacao/:id', SolicitacaoController.delete)


	// LOCACAO VEICULO
	.get('/locacoes', LocacaoController.index)
	.get('/locacao/:id', LocacaoController.filter)
	.post('/locacao', LocacaoController.create)
	.put('/locacao/:id', LocacaoController.update)
	.delete('/locacao/:id', LocacaoController.delete)


module.exports = routes