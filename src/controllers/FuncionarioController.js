const knex = require('../database')

module.exports = {
	// Listar funcionários existentes
	async index	(req, res) {
		// ------------- nome da tabela 👇
		const results = await	knex('funcionario')

		return res.json(results)
	},

	// Retornando um funcionário especifico
	async filter(req, res, next) {
		try {
			const { id } = req.params

			const results = await	knex('funcionario')
			.where({ id })

			return res.json(results)

		} catch (error) {
				next(error)
		}
	},

	// Criar/adicionar novo funcionário
	async create(req, res, next) {
		try {
			const { 
				cpf,
				nome,
				sobrenome,
				data_nasc,
				sexo,
				endereco,
				departamento_id
			} = req.body


			await knex('funcionario').insert({
				cpf,
				nome,
				sobrenome,
				data_nasc,
				sexo,
				endereco,
				departamento_id
			})

			return res.status(201).send()

		} catch (error) {
				next(error)
		}

	},

	// Editar funcionário existente
	async update(req, res, next) {
		try {
			const { 
				cpf,
				nome,
				sobrenome,
				data_nasc,
				sexo,
				endereco,
				departamento_id
			} = req.body

			const { id } = req.params

			await knex('funcionario')
			.update({ 
				cpf,
				nome,
				sobrenome,
				data_nasc,
				sexo,
				endereco,
				departamento_id
			})
			.where({ id })

			return res.send()

		} catch (error) {
				next(error)
		}
	},

	// Deletar un funcionario especifico
	async delete(req, res, next) {
		try{
			const { id } = req.params
			
			await knex('funcionario')
			.where({ id })
			.del()

			return res.send()

		}catch (error) {
			next(error)
		}
	},

}