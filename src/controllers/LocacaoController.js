const knex = require('../database')

module.exports = {
	// Listar veículos existentes
	async index	(req, res, next) {
		try {
			// ------------- nome da tabela 👇
			const results = await	knex()
			.select(

			)
		
			return res.json(results)

		}catch (error) {
			next(error)
		}
	},

	// Retornando um veiculo especifico
	async filter(req, res, next) {
		try {
			const { id } = req.params

			const results = await	knex()
			.select(

			)



			return res.json(results)

		} catch (error) {
				next(error)
		}
	},

	// Criar/adicionar novo veiculo
	async create(req, res, next) {
		try {
			const { 
				status_locacao,
				tanque_saida,
				tanque_chegada,
				km_saida,
				km_chegada,
				solicitacao_id,
				motorista_id,
			} = req.body

			// console.log(req.body)

			await knex('locacao_evento')
			.insert({
				status_locacao,
				tanque_saida,
				tanque_chegada,
				km_saida,
				km_chegada,
				solicitacao_id,
				motorista_id,
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
				status_locacao,
				tanque_saida,
				tanque_chegada,
				km_saida,
				km_chegada,
				solicitacao_id,
				motorista_id,
			} = req.body

			const { id } = req.params

			await knex('locacao_evento')
			.update({ 
				status_locacao,
				tanque_saida,
				tanque_chegada,
				km_saida,
				km_chegada,
				solicitacao_id,
				motorista_id,
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
			
			await knex('locacao_evento')
			.where({ id })
			.del()
			
			return res.send()

		}catch (error) {
			next(error)
		}
	},

}