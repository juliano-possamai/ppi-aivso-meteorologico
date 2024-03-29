const axios = require('axios');

class WeatherApi {
	/*login
		apiadvisor.climatempo.com.br
		jaxsen.deven@foodfarms.net
		#aZ9s#L4dkbBfHY
	*/

	constructor() {
		this.daysLimit = '1';
		this.apiurl = 'http://apiadvisor.climatempo.com.br/api/v1'
		this.apiKey = 'bf2ac10572100ad61c634c6c8b97c440';
		this.cityId = 5535;
	}

	/**
	 * ID da cidade de Bento Gonçalves, obtido de https://apiadvisor.climatempo.com.br/api/v1/locale/city?name=Bento%20Gon%C3%A7alves&state=RS&token=bf2ac10572100ad61c634c6c8b97c440
	 * @returns {number}
	 */
	getCityId() {
		return 5535;
	}

	setDaysLimit(days) {
		this.daysLimit = days;
	}

	getUrl() {
		return `${this.apiUrl}/forecast/locale/${this.cityId}/days/${this.daysLimit}?${this.apiKey}`
	}

	fetch() {
		return axios.get(getUrl());
	}

}

module.exports = WeatherApi;