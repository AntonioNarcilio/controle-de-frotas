const knex = require('../database')

module.exports = {
	// Listar departamentos existentes
	async index	(req, res, next) {
		try {
			// ------------- nome da tabela 👇
			const results = await	knex({d:'departamento'})
			.select(
				"d.id",
				"d.dnome",
				"f.nome",
				"f.sobrenome",
				"d.cpf_gerente",
				"d.data_ini_gerente",
			)
			.join({f: 'funcionario'}, 'd.cpf_gerente', '=', 'f.cpf')
			.orderBy('d.dnome', 'asc')

			return res.json(results)
			
		} catch (error) {
			next(error)
		}

	},

	// Retornando um departamento especifico
	async filter(req, res, next) {
		try {
			const { id } = req.params

			const results = await	knex({d:'departamento'})
			.select(
				"d.id",
				"d.dnome",
				"f.nome",
				"f.sobrenome",
				"d.cpf_gerente",
				"d.data_ini_gerente",
			)
			.join({f:'funcionario'}, 'd.cpf_gerente', '=', 'f.cpf')
			.where('d.id', '=', id)

			return res.json(results)

		} catch (error) {
				next(error)
		}
	},


	// Pesquisando pelo nome do departamento
	async search(req, res, next) {
		try {
			const { nome } = req.query

			const query = knex({d:'departamento'})

			if (nome)  {
				query
				.select(
					"d.id",
					"d.dnome",
					"f.nome",
					"f.sobrenome",
					"d.cpf_gerente",
					"d.data_ini_gerente",
				)
				.join({f:'funcionario'}, 'd.cpf_gerente', '=', 'f.cpf')
				.where('d.dnome', 'ilike', `%${nome}%`)
			}

			const results = await query
			
			return res.json(results)

		} catch (error) {
				next(error)
		}
	},


	// Criar/adicionar novo departamento
	async create(req, res, next) {
		try {
			const { 
				nome,
				cpf_gerente,
				data_ini_gerente
			} = req.body


			await knex('departamento').insert({
				nome,
				cpf_gerente,
				data_ini_gerente
			})

			return res.status(201).send()

		} catch (error) {
				next(error)
		}

	},

	// Editar departamento existente
	async update(req, res, next) {
		try {
			const { 
				nome,
				cpf_gerente,
				data_ini_gerente
			} = req.body

			const { id } = req.params

			await knex('departamento')
			.update({ 
				nome,
				cpf_gerente,
				data_ini_gerente
			})
			.where({ id })

			return res.send()

		} catch (error) {
				next(error)
		}
	},

	// Deletar un departamento especifico
	async delete(req, res, next) {
		try{
			const { id } = req.params
			
			await knex('departamento')
			.where({ id })
			.del()

			return res.send()

		}catch (error) {
			next(error)
		}
	},

}