const axios = require('axios');

class WeatherApi{
	/*login
		apiadvisor.climatempo.com.br
		jaxsen.deven@foodfarms.net
		#aZ9s#L4dkbBfHY
	*/

	constructor() {
		this.apiUrl = 'http://apiadvisor.climatempo.com.br/api/v1'
		this.apiKey = 'bf2ac10572100ad61c634c6c8b97c440'; //TOOD poderia estar em um env
		this.parameters = {
			cityId: this.getCityId()
		};
	}

	/**
	 * ID da cidade de Bento Gonçalves, obtido de https://apiadvisor.climatempo.com.br/api/v1/locale/city?name=Bento%20Gon%C3%A7alves&state=RS&token=bf2ac10572100ad61c634c6c8b97c440
	 * @returns {number}
	 */
	getCityId() {
		return 5535;
	}

	setParameters(params) {
		this.parameters = {...this.parameters, ...params};
	}

	getUrl() {
		return `${this.apiUrl}/forecast/locale/${this.parameters.cityId}/days/15`;
	}

	adaptResponse(response) {
		return response.map(data => ({
			date: data.date,
			rainProbability: data.rain.probability,
			message: data.text_icon.text.phrase.reduced
		}));
	}

	async fetch() {
		let response = await axios.get(this.getUrl(), { params: { token: this.apiKey } });
		return response.data.data;
	}

}

module.exports = WeatherApi;