const axios = require('axios');

class WeatherApi {
	/*login
		justino.jameal@farmoaks.com
		P,+G66z*dpWd?Va
	*/

	constructor() {
		this.days = '1';
		this.apiurl = 'https://api.weatherapi.com/v1/forecast.json';
		this.apiKey = 'e9c8e7f3c1c641adbd5115453241703';
		this.bentoGoncalvesGeoLocation = [-29.166666, -51.5166646];
	}

	setDays(days) {
		this.days = days;
	}

	getGeolocationAsString() {
		return bentoGoncalvesGeoLocation.join(',');
	}

	getUrl() {
		return `${apiUrl}?key=${apiKey}&q=${getGeolocationAsString()}&${this.days}`;
	}

	fetch() {
		return axios.get(getUrl());
	}

}

module.exports = WeatherApi;