const knex = require('../database')

module.exports = {
	// Listar veículos existentes
	async index	(req, res, next) {
		try {
			// ------------- nome da tabela 👇
			const results = await	knex({v:'veiculo'})
			.select(
				'v.id',
				'v.marca',
				'v.modelo',
				'v.ano_fabricacao',
				't.categoria',
				't.portas',
				't.tipo_farol',
				't.cambio',
				't.ocupantes',
				'v.num_chassi',
				'v.num_placa',
				'v.tipo_combustivel',
				'v.tanque_tamanho',
				'v.tanque_atual',
				'v.quilometragem'
			)
			.join({t: 'tipo_veiculo'}, 'v.id', '=', 't.veiculo_id')
		
			return res.json(results)

		}catch (error) {
			next(error)
		}
	},

	// Retornando um veiculo especifico
	async filter(req, res, next) {
		try {
			const { id } = req.params

			const results = await	knex({v:'veiculo'})
			.select(
				'v.id',
				'v.marca',
				'v.modelo',
				'v.ano_fabricacao',
				't.categoria',
				't.portas',
				't.tipo_farol',
				't.cambio',
				't.ocupantes',
				'v.num_chassi',
				'v.num_placa',
				'v.tipo_combustivel',
				'v.tanque_tamanho',
				'v.tanque_atual',
				'v.quilometragem'
			)
			.join({t: 'tipo_veiculo'}, 'v.id', '=', 't.veiculo_id')
			.where('v.id', '=', id)

			return res.json(results)

		} catch (error) {
				next(error)
		}
	},


	// Pesquisando veiculo por nome/modelo ou pelo num placa
	async search(req, res, next) {
		try {
			const { nome, placa } = req.query

			const query = knex({v:'veiculo'})

			// Consulta pelo modelo
			if (nome)  {
				query
				.select(
					'v.id',
					'v.marca',
					'v.modelo',
					'v.ano_fabricacao',
					't.categoria',
					't.portas',
					't.tipo_farol',
					't.cambio',
					't.ocupantes',
					'v.num_chassi',
					'v.num_placa',
					'v.tipo_combustivel',
					'v.tanque_tamanho',
					'v.tanque_atual',
					'v.quilometragem'
				)
				.join({t: 'tipo_veiculo'}, 'v.id', '=', 't.veiculo_id')
				.where('v.modelo', 'ilike', `%${nome}%`)
			}

			// Consulta pelo numero da placa
			if (placa)  {
				query
				.select(
					'v.id',
					'v.marca',
					'v.modelo',
					'v.ano_fabricacao',
					't.categoria',
					't.portas',
					't.tipo_farol',
					't.cambio',
					't.ocupantes',
					'v.num_chassi',
					'v.num_placa',
					'v.tipo_combustivel',
					'v.tanque_tamanho',
					'v.tanque_atual',
					'v.quilometragem'
				)
				.join({t: 'tipo_veiculo'}, 'v.id', '=', 't.veiculo_id')
				.where('v.num_placa', 'ilike', placa)
			}

			const results = await query
			
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
				quilometragem,
				categoria,
				portas,
				tipo_farol,
				cambio,
				ocupantes,
			} = req.body

			console.log(req.body)

			await knex('veiculo')
			.returning('id')
			.insert({
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
			.then(rows => 
				knex('tipo_veiculo')
				.insert({ 	
					categoria,
					portas,
					tipo_farol,
					cambio,
					ocupantes, 
					veiculo_id: rows[0] 
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
	     marca,
       modelo,
       ano_fabricacao,
       categoria,
       portas,
       tipo_farol,
       cambio,
       ocupantes,
       num_chassi,
       num_placa,
       tipo_combustivel,
       tanque_tamanho,
       tanque_atual,
       quilometragem,
			} = req.body

			const { id } = req.params

			await knex({v:'veiculo'})
			.returning('id')
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
			.where('v.id', '=', id)
			.then(rows => 
				knex('tipo_veiculo')
				.update({ 	
					categoria,
					portas,
					tipo_farol,
					cambio,
					ocupantes
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
			
			await knex('veiculo')
			.where({ id })
			.del()
			
			return res.send()

		}catch (error) {
			next(error)
		}
	},

}