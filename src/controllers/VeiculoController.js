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
			.then(rows => 
				knex('tipo_veiculo')
				.update({ 	
					categoria,
					portas,
					tipo_farol,
					cambio,
					ocupantes, 
					veiculo_id: rows[0] 
				})
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
			await knex('tipo_veiculo')
			.where('veiculo_id', '=', id )
			.del()
			

			return res.send()

		}catch (error) {
			next(error)
		}
	},

}