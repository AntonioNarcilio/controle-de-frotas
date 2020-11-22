const uri  = 'http://localhost:3333/departamentos'


const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];


function getDepartamentos () {

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

getDepartamentos()

function adicionaZero(numero){
	if (numero <= 9) 
			return "0" + numero;
	else
			return numero; 
}



function View(departamentos) {
	let output = ''

	for (let departamento of departamentos) {

		// Editando data
		let data = new Date(`${departamento.data_ini_gerente}`); 
		let dataFormatada = (adicionaZero(data.getDate().toString()) + " " + meses[(data.getMonth())] + " " + data.getFullYear()) ;
		// console.log(dataFormatada);

		output += `
		<tr>
		<td>${departamento.dnome}</td>
		<td>${departamento.cpf_gerente}</td>
		<td>${dataFormatada}</td>
		</tr>
		`
	}


	document.querySelector('tbody').innerHTML = output

}
