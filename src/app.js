function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wendnesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;
}

function changeInnerHTML(objectName, newContent) {
	let selectedElement = document.querySelector(objectName);
	selectedElement.innerHTML = newContent;
}

function changeSetAttribute(objectName, attributeName, newContent) {
	let selectedElement = document.querySelector(objectName);
	selectedElement.setAttribute(attributeName, newContent);
}
function displayApiData(response) {
	console.log(response.data);
	// change country
	changeInnerHTML(".country", response.data.country.split(" (")[0]);
	// change city
	changeInnerHTML(".city", response.data.city);
	// change date
	changeInnerHTML(".date", formatDate(response.data.time));
	// change weather description
	changeInnerHTML(".weather-description", response.data.condition.description);
	// change temperature degree
	changeInnerHTML(".degree", Math.round(response.data.temperature.current));
	// change humidity
	changeInnerHTML(".humidity", response.data.temperature.humidity);
	//  change wind speed
	changeInnerHTML(".wind", Math.round(response.data.wind.speed));
	//  change feels like
	changeInnerHTML(
		".feelsLike",
		Math.round(response.data.temperature.feels_like)
	);
	// change weather icon
	changeSetAttribute("#weather-icon", "src", response.data.condition.icon_url);
	// change image alt
	changeSetAttribute("#weather-icon", "alt", response.data.condition.icon);
}
let key = "9080739tbf37e964oc44a735390ad04b";
let query = "lisbon";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=metric`;

axios.get(apiUrl).then(displayApiData);
