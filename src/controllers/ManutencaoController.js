const knex = require('../database')

module.exports = {
	// Listar veículos existentes
	async index	(req, res, next) {
		try {
			// ------------- nome da tabela 👇
			const results = await	knex({m:'manutencao'})
			.select(
				'm.id',
				'm.tipo',
				'm.quilometragem',
				'm.causa',
				'm.observacao',
				'f.nome',
				'f.sobrenome',
				'mt.cnh',
				'v.modelo',
				'v.num_placa',
				'pt.nome_peca',
				'pt.garantia_meses'
			)
			.join({pt: 'pecas_trocadas'}, 'pt.manutencao_id', '=', 'm.id')
			.join({v: 'veiculo'}, 'v.id', '=', 'm.veiculo_id')
			.join({mt: 'motorista'}, 'mt.id', '=', 'm.motorista_id')
			.join({f: 'funcionario'}, 'f.id', '=', 'mt.id')
			.orderBy('m.id', 'asc')

			const [ count ] = await knex('manutencao').count()
			console.log(`\nExiste ${count.count} manutenção(ões) cadastrada(s)\n`)

			return res.json(results)

		}catch (error) {
			next(error)
		}
	},

	// Retornando um veiculo especifico
	async filter(req, res, next) {
		try {
			const { id } = req.params

			const results = await	knex({m:'manutencao'})
			.select(
				'm.id',
				'm.tipo',
				'm.quilometragem',
				'm.causa',
				'm.observacao',
				'f.nome',
				'f.sobrenome',
				'mt.cnh',
				'v.modelo',
				'v.num_placa',
				'pt.nome_peca',
				'pt.garantia_meses'
			)
			.join({pt:'pecas_trocadas'}, 'pt.manutencao_id', '=', 'm.id')
			.join({v:'veiculo'}, 'v.id', '=', 'm.veiculo_id')
			.join({mt:'motorista'}, 'mt.id', '=', 'm.motorista_id')
			.join({f:'funcionario'}, 'f.id', '=', 'mt.id')
			.where('m.id', '=', id)

			return res.json(results)

		} catch (error) {
				next(error)
		}
	},

	// Criar/adicionar novo veiculo
	async create(req, res, next) {
		try {
			const { 
				tipo,
				quilometragem,
				causa,
				observacao,
				motorista_id,
				veiculo_id,
				nome_peca,
				garantia_meses, 
			} = req.body

			await knex('manutencao')
			.returning('id')
			.insert({
				tipo,
				quilometragem,
				causa,
				observacao,
				motorista_id,
				veiculo_id
			})
			.then(rows => 
				knex('pecas_trocadas')
				.insert({ 	
					nome_peca,
					garantia_meses, 
					manutencao_id: rows[0] 
				})
			)

			return res.status(201).send()

		} catch (error) {
				next(error)
		}

	},

	// Editar veiculo existente
	async update(req, res, next) {
		try {
			const { 
				tipo,
				quilometragem,
				causa,
				observacao,
				motorista_id,
				veiculo_id,
				nome_peca,
				garantia_meses, 
			} = req.body

			const { id } = req.params

			await knex('manutencao')
			.returning('id')
			.update({
				tipo,
				quilometragem,
				causa,
				observacao,
				motorista_id,
				veiculo_id
			})
			.where({ id })
			.then(rows => 
				knex('pecas_trocadas')
				.update({ 	
					nome_peca,
					garantia_meses
				}).where({manutencao_id: rows[0]})
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
			
			await knex('manutencao')
			.where({ id })
			.del()
			
			return res.send()

		}catch (error) {
			next(error)
		}
	},

}