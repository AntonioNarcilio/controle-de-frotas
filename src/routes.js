const express = require('express')
const routes = express.Router()

const FuncionarioController = require('./controllers/FuncionarioController')

// Listar todos os funcionários
routes.get('/funcionario', FuncionarioController.index)
// Retornado dados de um funcionário especifico
routes.get('/funcionario/:id', FuncionarioController.filter)
// Adicionar um novo funcionário
routes.post('/funcionario', FuncionarioController.create)
// Editar um determinado funcionário
routes.put('/funcionario/:id', FuncionarioController.update)
// Deletando um usuário especifico
routes.delete('/funcionario/:id', FuncionarioController.delete)


module.exports = routes