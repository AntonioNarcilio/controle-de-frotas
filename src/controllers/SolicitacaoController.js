const knex = require('../database')

module.exports = {
	// Listar veículos existentes
	async index	(req, res, next) {
		try {
			// ------------- nome da tabela 👇
			const results = await	knex({s:'solicitacao'})
			.select(
				's.id',
				's.tipo_evento',
				's.data_e_hora',
				's.local_endereco',
				's.qtd_pessoas',
				's.tempo_de_utilizacao',
				'v.modelo',
				'v.num_placa',
				'f.nome',
				'f.sobrenome',
				'f.cpf',
				'd.dnome'
			)
			.join({v:'veiculo'}, 's.veiculo_id', '=', 'v.id')
			.join({f:'funcionario'}, 's.funcionario_id', '=', 'f.id')
			.join({d:'departamento'}, 's.funcionario_departamento_id', '=', 'd.id')
		
			return res.json(results)

		}catch (error) {
			next(error)
		}
	},

	// Retornando um veiculo especifico
	async filter(req, res, next) {
		try {
			const { id } = req.params

			const results = await	knex({s:'solicitacao'})
			.select(
				's.id',
				's.tipo_evento',
				's.data_e_hora',
				's.local_endereco',
				's.qtd_pessoas',
				's.tempo_de_utilizacao',
				'v.modelo',
				'v.num_placa',
				'f.nome',
				'f.sobrenome',
				'f.cpf',
				'd.dnome'
			)
			.join({v:'veiculo'}, 's.veiculo_id', '=', 'v.id')
			.join({f:'funcionario'}, 's.funcionario_id', '=', 'f.id')
			.join({d:'departamento'}, 's.funcionario_departamento_id', '=', 'd.id')
			.where('s.id', '=', id)

			return res.json(results)

		} catch (error) {
				next(error)
		}
	},

	// Criar/adicionar novo veiculo
	async create(req, res, next) {
		try {
			const { 
				tipo_evento,
				data_e_hora,
				local_endereco,
				qtd_pessoas,
				tempo_de_utilizacao,
			} = req.body

			console.log(req.body)

			await knex({s:'solicitacao'})
			.returning('id')
			.insert({
				tipo_evento,
				data_e_hora,
				local_endereco,
				qtd_pessoas,
				tempo_de_utilizacao,
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

			} = req.body

			const { id } = req.params

			await knex({s:'solicitacao'})
			.returning('id')
			.update({ 
				tipo_evento,
				data_e_hora,
				local_endereco,
				qtd_pessoas,
				tempo_de_utilizacao,
			})
			.where('v.id', '=', id)
			.then(rows => 
				knex('tipo_veiculo')
				.update({ 	

				}).where({veiculo_id: rows[0] })
			)
			
			return res.send()

		} catch (error) {
				next(error)
		}
	},

	// Deletar un veiculo especifico
	async delete(req, res, next) {
		try{
			const { id } = req.params
			
			await knex({s:'solicitacao'})
			.where({ id })
			.del()
			
			return res.send()

		}catch (error) {
			next(error)
		}
	},

}