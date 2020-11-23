const uri  = 'http://localhost:3333/funcionarios'

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];


function getFuncionario () {

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

getFuncionario()


function adicionaZero(numero){
	if (numero <= 9) 
			return "0" + numero;
	else
			return numero; 
}


function View(funcionarios) {
	let output = ''

	for (let funcionario of funcionarios) {

		// Editando data
		let data = new Date(`${funcionario.data_nasc}`); 
		let dataFormatada = (adicionaZero(data.getDate().toString()) + " " + meses[(data.getMonth())] + " " + data.getFullYear()) ;
		// console.log(dataFormatada);

		output += `
		<tr>
			<td>${funcionario.nome}</td>
			<td>${funcionario.sobrenome}</td>
			<td>${funcionario.cpf}</td>
			<td>${dataFormatada}</td>
			<td>${funcionario.sexo}</td>
			<td>${funcionario.endereco}</td>
			<td>${funcionario.dnome}</td>
		</tr>
		`
	}


	document.querySelector('tbody').innerHTML = output

}
