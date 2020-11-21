const knex = require('../database')

module.exports = {
	// Listar veículos existentes
	async index	(req, res, next) {
		try {
			// ------------- nome da tabela 👇
			const results = await	knex({le:'locacao_evento'})
			.select(
				's.id',
				'le.status_locacao',
				'le.tanque_saida',
				'le.tanque_chegada',
				'le.km_saida',
				'le.km_chegada',
				's.tipo_evento',
				's.data_e_hora',
				'f.nome',
				'f.sobrenome',
				'le.motorista_id'
			)
			.join({s:'solicitacao'}, 'le.solicitacao_id', '=', 's.id')
			.join({f:'funcionario'}, 's.funcionario_id', '=', 'f.id')
		
			return res.json(results)

		}catch (error) {
			next(error)
		}
	},

	// Retornando um veiculo especifico
	async filter(req, res, next) {
		try {
			const { id } = req.params

			const results = await	knex({le:'locacao_evento'})
			.select(
				's.id',
				'le.status_locacao',
				'le.tanque_saida',
				'le.tanque_chegada',
				'le.km_saida',
				'le.km_chegada',
				's.tipo_evento',
				's.data_e_hora',
				'f.nome',
				'f.sobrenome',
				'le.motorista_id'
			)
			.join({s:'solicitacao'}, 'le.solicitacao_id', '=', 's.id')
			.join({f:'funcionario'}, 's.funcionario_id', '=', 'f.id')
			.where('s.id', '=', id )

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
				motorista_id
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
				motorista_id
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
				motorista_id
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
				motorista_id
			})
			.where('solicitacao_id', '=', id)
			
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
			.where('solicitacao_id', '=', id)
			.del()
			
			return res.send()

		}catch (error) {
			next(error)
		}
	},

}