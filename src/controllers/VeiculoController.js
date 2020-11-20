const knex = require('../database')

module.exports = {
	// Listar veículos existentes
	async index	(req, res, next) {
		try {
			// ------------- nome da tabela 👇
			const results = await	knex('veiculo')
			return res.json(results)

		}catch (error) {
			next(error)
		}
	},

	// Retornando um veiculo especifico
	async filter(req, res, next) {
		try {
			const { id } = req.params

			const results = await	knex('veiculo')
			.where({ id })

			return res.json(results)

		} catch (error) {
				next(error)
		}
	},

	// Criar/adicionar novo veiculo
	async create(req, res, next) {
		try {
			const { 
				marca,
				modelo,
				ano_fabricacao,
				num_chassi,
				num_placa,
				tipo_combustivel,
				tanque_tamanho,
				tanque_atual,
				quilometragem
			} = req.body


			await knex('veiculo').insert({
				marca,
				modelo,
				ano_fabricacao,
				num_chassi,
				num_placa,
				tipo_combustivel,
				tanque_tamanho,
				tanque_atual,
				quilometragem
			})

			return res.status(201).send()

		} catch (error) {
				next(error)
		}

	},

	// Editar veiculo existente
	async update(req, res, next) {
		try {
			const { 
				marca,
				modelo,
				ano_fabricacao,
				num_chassi,
				num_placa,
				tipo_combustivel,
				tanque_tamanho,
				tanque_atual,
				quilometragem
			} = req.body

			const { id } = req.params

			await knex('veiculo')
			.update({ 
				marca,
				modelo,
				ano_fabricacao,
				num_chassi,
				num_placa,
				tipo_combustivel,
				tanque_tamanho,
				tanque_atual,
				quilometragem
			})
			.where({ id })

			return res.send()

		} catch (error) {
				next(error)
		}
	},

	// Deletar un veiculo especifico
	async delete(req, res, next) {
		try{
			const { id } = req.params
			
			await knex('veiculo')
			.where({ id })
			.del()

			return res.send()

		}catch (error) {
			next(error)
		}
	},

}