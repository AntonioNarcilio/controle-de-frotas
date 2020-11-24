const knex = require('../database')

module.exports = {
	// Listar funcionários existentes
	async index	(req, res, next) {
		try {
			// ------------- nome da tabela 👇
			const results = await	knex({f:'funcionario'})
			.select(
				'f.id',
				'f.nome', 
				'f.sobrenome', 
				'f.cpf',
				'f.data_nasc',
				'f.sexo',
				'f.endereco',
				'f.departamento_id',
				'd.dnome', 
				)
			.join({d: 'departamento'}, 'f.departamento_id', '=', 'd.id')
			.orderBy('f.nome', 'asc')

			const [ count ] = await knex('funcionario').count()
			console.log(`\nExiste ${count.count} funcionários cadastrados\n`)

			return res.json(results)


		} catch (error) {
			next(error)
		}

	},

	// Retornando um funcionário especifico
	async filter(req, res, next) {
		try {
			const { id } = req.params

			const results = await	knex({f:'funcionario'})
			.select(
				'f.id',
				'f.nome', 
				'f.sobrenome', 
				'f.cpf',
				'f.data_nasc',
				'f.sexo',
				'f.endereco',
				'd.dnome', 
				)
			.join({d: 'departamento'}, 'f.departamento_id', '=', 'd.id')
			.where('f.id', '=', id)
			
			return res.json(results)

		} catch (error) {
				next(error)
		}
	},

	// Pesquisando funcionário por nome
	async search(req, res, next) {
		try {
			const { nome } = req.query

			const query = knex({f:'funcionario'})

			if (nome)  {
				query
				.select(
					'f.id',
					'f.nome', 
					'f.sobrenome', 
					'f.cpf',
					'f.data_nasc',
					'f.sexo',
					'f.endereco',
					'd.dnome', 
					)
				.join({d: 'departamento'}, 'f.departamento_id', '=', 'd.id')
				.where('f.nome', 'ilike', `%${nome}%`)
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