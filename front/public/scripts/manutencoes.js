const uri  = 'http://localhost:3333/manutencoes'

function getManutencoes () {

	axios
	.get(`${uri}`)
	.then((res) => {
			// console.log('Data =>', res.data)
			const data = res.data
			View(data)
	})
	.catch((err) => {
			console.warn(err);
	})

}

getManutencoes()

function View(manutencoes) {
	let output = ''

	for (let manutencao of manutencoes) {

		output += `
		<tr>
			<td>${manutencao.tipo}</td>
			<td>${manutencao.quilometragem}</td>
			<td>${manutencao.causa}</td>
			<td>${manutencao.observacao}</td>
			<td>${manutencao.nome}</td>
			<td>${manutencao.sobrenome}</td>
			<td>${manutencao.cnh}</td>
			<td>${manutencao.modelo}</td>
			<td>${manutencao.num_placa}</td>
			<td>${manutencao.nome_peca}</td>
			<td>${manutencao.garantia_meses}</td>
		</tr>
		`
	}

	document.querySelector('tbody').innerHTML = output

}
