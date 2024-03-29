const mongoose = require("mongoose");
const Warning = mongoose.model("Warning");

class NotifierJob {
/*
obter configuracoes de clientes no mongo
obter valor para o parametro dias
fazer request
para cada cliente
	verificar se probabilidade de chuva é maior que a configurada
	se sim, notificar por email
	se nao, continue

*/

	run() {
		let daysOffset = this.getDaysLimit();
	}

	getUsers() {
		/*
		obter número máximo de dias de antecedencia
		realizar consulta na API especificando o dia maximo

		criar objeto onde a chave é o data YYYY-mm-dd e o valor é:
			data -> rain -> probability
			data -> text_icon -> text -> phrase -> reduced
		criar um objeto de usuarios com o id e o email
		criar um objeto onde a chave é a data e o valor é:
			id, probabilidade maxima
		*/

		// const Warning = mongoose.model("Warning");
		// Warning.find

		return [];
	}

	getDaysLimit() {
		Warning.aggregate([
			{
			  $group: {
				_id: null,
				maxValor: { $max: "$seuCampo" }
			  }
			}
		  ]);
	}

}

