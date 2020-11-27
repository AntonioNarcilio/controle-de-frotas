const knex = require('../database')

module.exports = {
	// Listar veículos existentes
	async index	(req, res, next) {
		try {
			// ------------- nome da tabela 👇
			const results = await	knex({m:'multa'})
			.select(
				'm.id',
				'm.local_endereco', 
				'm.data_e_hora', 
				'm.tipo',
				'v.modelo',
				'v.num_placa',
				'v.num_chassi',
				'f.nome',
				'f.sobrenome',
				'mt.cnh'
			)
			.join({v: 'veiculo'}, 'm.veiculo_id', '=', 'v.id')
			.join({mt: 'motorista'}, 'm.motorista_id', '=', 'mt.id')
			.join({f: 'funcionario'}, 'mt.funcionario_id', '=', 'f.id')
			.orderBy('m.id', 'asc')

			const [ count ] = await knex('multa').count()
			console.log(`\nExiste ${count.count} multa(s) cadastrada(s)\n`)
		
			return res.json(results)

		}catch (error) {
			next(error)
		}
	},

	// Retornando um veiculo especifico
	async filter(req, res, next) {
		try {
			const { id } = req.params

			const results = await	knex({m:'multa'})
			.select(
				'm.id',
				'm.local_endereco', 
				'm.data_e_hora', 
				'm.tipo',
				'v.modelo',
				'v.num_placa',
				'v.num_chassi',
				'f.nome',
				'f.sobrenome',
				'mt.cnh'
			)
			.join({v: 'veiculo'}, 'm.veiculo_id', '=', 'v.id')
			.join({mt: 'motorista'}, 'm.motorista_id', '=', 'mt.id')
			.join({f: 'funcionario'}, 'mt.funcionario_id', '=', 'f.id')
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
				local_endereco, 
				data_e_hora, 
				tipo,
				veiculo_id,
				motorista_id
			} = req.body

			await knex('multa')
			.insert({
				local_endereco, 
				data_e_hora, 
				tipo,
				veiculo_id,
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
				local_endereco, 
				data_e_hora, 
				tipo,
				veiculo_id,
				motorista_id
			} = req.body

			const { id } = req.params

			await knex('multa')
			.update({ 
				local_endereco, 
				data_e_hora, 
				tipo,
				veiculo_id,
				motorista_id
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
			
			await knex('multa')
			.where({ id })
			.del()
			
			return res.send()

		}catch (error) {
			next(error)
		}
	},

}