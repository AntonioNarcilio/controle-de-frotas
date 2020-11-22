const knex = require('../database')

module.exports = {
	// Listar funcionários existentes
	async index	(req, res, next) {
		try {
			// ------------- nome da tabela 👇
			const results = await	knex({m: 'motorista'})
			.select(
				'm.id',
				'm.cnh',
				'm.tipo_cnh',
				'm.data_venc_cnh',
				'f.nome',
				'f.sobrenome',
				'd.dnome'
				)
			.join({f:'funcionario'}, 'm.funcionario_id', '=', 'f.id')
			.join({d:'departamento'}, 'm.funcionario_departamento_id', '=', 'd.id')
			.orderBy('m.id', 'asc')

			return res.json(results)


		} catch (error) {
			next(error)
		}

	},

	// Retornando um funcionário especifico
	async filter(req, res, next) {
		try {
			const { id } = req.params

			const results = await	knex({m: 'motorista'})
			.select(
				'm.id',
				'm.cnh',
				'm.tipo_cnh',
				'm.data_venc_cnh',
				'f.nome',
				'f.sobrenome',
				'd.dnome'
				)
			.join({f:'funcionario'}, 'm.funcionario_id', '=', 'f.id')
			.join({d:'departamento'}, 'm.funcionario_departamento_id', '=', 'd.id')
			.where('m.id', '=', id)
			
			return res.json(results)

		} catch (error) {
				next(error)
		}
	},


	// Pesquisando Funcionário Por Nome
	async search(req, res, next) {
		try {
			const { cnh, tipo_cnh } = req.query

			const query = knex({m:'motorista'})

			// Pelo numero da cnh
			if (cnh)  {
				query
				.select(
					'm.id',
					'm.cnh',
					'm.tipo_cnh',
					'm.data_venc_cnh',
					'f.nome',
					'f.sobrenome',
					'd.dnome'
					)
				.join({f:'funcionario'}, 'm.funcionario_id', '=', 'f.id')
				.join({d:'departamento'}, 'm.funcionario_departamento_id', '=', 'd.id')	
				.where('m.cnh', 'ilike', cnh)
			}

			// Tipo
			if (tipo_cnh)  {
				query
				.select(
					'm.id',
					'm.cnh',
					'm.tipo_cnh',
					'm.data_venc_cnh',
					'f.nome',
					'f.sobrenome',
					'd.dnome'
					)
				.join({f:'funcionario'}, 'm.funcionario_id', '=', 'f.id')
				.join({d:'departamento'}, 'm.funcionario_departamento_id', '=', 'd.id')	
				.where('m.tipo_cnh', '=', tipo_cnh)
			}

			const results = await query
			
			return res.json(results)

		} catch (error) {
				next(error)
		}
	},

	// Criar/adicionar novo funcionário
	async create(req, res, next) {
		try {
			const { 
				cnh,
				tipo_cnh,
				data_venc_cnh,
				funcionario_id,
				funcionario_departamento_id
			} = req.body


			await knex('motorista').insert({
				cnh,
				tipo_cnh,
				data_venc_cnh,
				funcionario_id,
				funcionario_departamento_id
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
				cnh,
				tipo_cnh,
				data_venc_cnh,
				funcionario_id,
				funcionario_departamento_id
			} = req.body

			const { id } = req.params

			await knex('motorista')
			.update({ 
				cnh,
				tipo_cnh,
				data_venc_cnh,
				funcionario_id,
				funcionario_departamento_id
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
			
			await knex('motorista')
			.where({ id })
			.del()

			return res.send()

		}catch (error) {
			next(error)
		}
	},

}