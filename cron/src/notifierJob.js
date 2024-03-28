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

	constructor() {
		this.clientes = this.obterClientes();
		this.dias = this.obterDias();
	}

	obterClientes() {
		return [];
	}
}